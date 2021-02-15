import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ReconcileListFilter } from 'application/administration/reconcile/models';
import { ModalParams } from 'core/models';
import { isSome } from 'core/utils';
import { ReconcileEditForm } from 'application/administration/reconcile/forms';
import { saveAs } from '@progress/kendo-file-saver';

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
                            'paymentType'
                        ]
                        return rootStore.application.administration.reconcileStore.findReconcile(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.editModal = new ModalParams({});
        this.previewModal = new ModalParams({});
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
        let contentType = 'application/pdf';
        if (reconcile.paymentType.abrv === 'ach-transfer') {
            contentType = 'text/csv';
        }
        const report = await this.rootStore.application.administration.reconcileStore.generateReport({ contentType: contentType, ...reconcile });
        const nowDate = new Date();
        const fileName = `${"Check Receipt".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.pdf`;
        saveAs(report.data, fileName);
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentNumber',
                    title: 'RECONCILE.LIST.COLUMNS.PAYMENT_NUMBER_LABEL'
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
                    title: 'RECONCILE.LIST.COLUMNS.CHARITY_NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'RECONCILE.LIST.COLUMNS.DESCRIPTION_LABEL'
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
                    return item.isCashed !== false;
                },
                onPreviewRender: (item) => {
                    return item.isCashed && item.json;
                }
            }
        }));
    }
}

export default ReconcileViewStore;
