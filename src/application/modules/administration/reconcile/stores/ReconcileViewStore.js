import React from 'react';
import { action } from 'mobx';
import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { ReconcileListFilter } from 'application/administration/reconcile/models';
import { ModalParams } from 'core/models';
import { isSome } from 'core/utils';
import { ReconcileEditForm } from 'application/administration/reconcile/forms';
import { saveAs } from '@progress/kendo-file-saver';
import ReconcileSelectTableWithLoadOnDemand from 'application/administration/donation/stores/ReconcileSelectTableWithLoadOnDemand';

class ReconcileViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'reconcile',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: new ReconcileListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'paymentTransaction',
                            'paymentType',
                        ]
                        return rootStore.application.administration.reconcileStore.findReconcile(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.editModal = new ModalParams({});
        this.previewModal = new ModalParams({});
        this.uploadFileTemplateModal = new ModalParams({});
        this.reconcileCashedPreviewModal = new ModalParams({});

        this.createPaymentTypeDropodownStore();
    }

    @action.bound
    openEditModal(reconcile) {
        this.editModal.open({
            reconcile: reconcile,
            onAfterEdit: () => {
                this.editModal.close();
                this.queryUtility.fetch()
            }
        });
    }

    @action.bound
    openPreviewModal(reconcile) {
        this.previewModal.open({
            reconcile: reconcile
        });
    }

    @action.bound
    openUploadFileTemplateModal() {
        this.uploadFileTemplateModal.open({
        });
    }

    @action.bound
    async cashConfirm(reconcile) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to mark transaction as cashed?`,
            async () => {
                let form = new ReconcileEditForm();
                form.$('isCashed').set(true);
                await this.rootStore.application.administration.reconcileStore.checkUpdate({ id: reconcile.id, ...form.values() });
                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully cashed transaction');
            }
        );
    }

    @action.bound
    async printReport(reconcile) {
        this.tableStore.suspend();
        let extension = 'pdf';
        let contentType = 'application/pdf';
        if (reconcile.paymentType.abrv === 'ach') {
            contentType = 'text/csv';
            extension = 'csv'
        }
        const report = await this.rootStore.application.administration.reconcileStore.generateReport({ contentType, ids: [reconcile.id], paymentTypeId: reconcile.paymentType.id });
        const nowDate = new Date();
        const fileName = `${"Receipt".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.${extension}`;
        saveAs(report.data, fileName);
        this.tableStore.resume();
        this.rootStore.notificationStore.success("Report generated.");
    }

    @action.bound
    async getReconcileDetailsByCharityId(id){
        this.data = await this.rootStore.application.administration.reconcileStore.getReconcileDetailsByCwtId(id);
        return this.data;
    }

    createTableStore() {
        this.setTableStore(new ReconcileSelectTableWithLoadOnDemand(this.queryUtility, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_NUMBER_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if (item.paymentType.abrv === 'ach' && item.achBatchNumber) {
                                return `${item.achBatchNumber} - ${item.paymentNumber}`;
                            }
                            return item.paymentNumber;
                        }
                    }
                },
                {
                    key: 'paymentType.name',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_TYPE_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'RECONCILE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'RECONCILE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                    format:  {
                        type: 'function',
                        value: (item) => {
                            if(item.id == '7cccc43a-f85f-4a7b-b422-ae8a0178f358' || item.id =='f7c79590-604d-4319-bdda-ae8a017a512c') {
                                return <div>
                                    {item.charity.name} (*)
                                </div>
                            } else if(item.address){
                                return <div>
                                    {item.charity.name} 
                                    <small style={{ display: "block" }}>
                                        {item.address}
                                        </small>
                                        {item.paymentType.abrv === 'ach' && (
                                            <small style={{ display: "block" }}>
                                            {item.bankAccount}
                                            </small>
                                        )}
                                </div>
                            } else {
                                return <div>
                                    {item.charity.name} 
                                </div>
                            }
                            
                        }
                    },
                    sortable: false
                },
                {
                    key: 'isCashed',
                    title: 'RECONCILE.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'isWithdraw',
                    title: 'RECONCILE.LIST.COLUMNS.IS_WITHDRAW',
                    format : {
                        type: 'function',
                        value: (item) => {
                            return item.isWithdraw ? <div className="type--center" ><i class="u-icon u-icon--approve u-icon--base "></i></div> : null;

                        }
                    },
                    sortable: false
                },
                {
                    key: 'dateCashed',
                    title: 'RECONCILE.LIST.COLUMNS.DATE_UPDATED',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                },
                {
                    key: 'description',
                    title: 'RECONCILE.LIST.COLUMNS.DESCRIPTION_LABEL',
                    sortable: false
                },
                {
                    key: 'dateCreated',
                    title: 'RECONCILE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'full'
                    }
                }
            ],
            comparerFunction: (p, c) => {
                let shouldRerenderRow = false;
                if (!_.isNil(c.expanded)) {
                    return shouldRerenderRow = true;
                } else {
                    _.forEach(this.tableStore.config.columns, col => {
                        if (_.get(p, col.key) !== _.get(c, col.key)) {
                            shouldRerenderRow = true;
                            return false;
                        }
                    })
                    return shouldRerenderRow;
                }
            },
            actions: {
                onEdit: (item) => this.openEditModal(item),
                onCash: (item) => this.cashConfirm(item),
                onPrintReport: (item) => this.printReport(item),
                onPreview: (item) => this.openPreviewModal(item),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return !item.isCashed && item.paymentType.abrv === 'check';
                },
                onCashRender: (item) => {
                    return !isSome(item.isCashed);
                },
                onPrintReportRender: (item) => {
                    return (item.isCashed !== false || item.isCashed !== null) && item.paymentType.abrv !== 'charity-account';
                },
                onPreviewRender: (item) => {
                    return item.isCashed && item.json;
                }
            }
        }, false, this.getReconcileDetailsByCharityId));
    }
    createPaymentTypeDropodownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.paymentTypeStore.find();
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter.paymentTypeIds = paymentType.map(type => { return type.id });
                }
            });

        }
}

export default ReconcileViewStore;
