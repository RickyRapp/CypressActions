import React from 'react';
import { BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { PendingDonationListFilter } from 'application/administration/donation/models';
import { PendingDonationReviewForm } from 'application/administration/donation/forms';
import { SelectTableWithLoadOnDemand } from 'application/administration/donation/stores';
import { action, observable } from 'mobx';
import _ from 'lodash';
import { saveAs } from '@progress/kendo-file-saver';
import { ModalParams } from 'core/models';

class PendingDonationViewStore extends BaseListViewStore {
    @observable disableSave = false;
    @observable paymentNumber = '';
    @observable isTransferToCharityAccount = false;
    @observable achBatchCurrentNumber = false;
    data = null;

    form = new PendingDonationReviewForm({
        onSuccess: async () => {
            this.disableSave = true;
            const onlySelectedDonations = this.tableStore.selectedItems.map(p => {
                if (p.pendingDonations) {
                    p.pendingDonations = p.pendingDonations.filter(s => s.checked);
                }
                return p;
            });
            this.form.$('selectedItems').set(onlySelectedDonations);
            await this.onReviewClick(this.form.values());
            this.disableSave = false;
        }
    })

    constructor(rootStore) {
        const filter = new PendingDonationListFilter();
        filter.pageSize = 100;
        filter.pageNumber = 1;

        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
            },
            actions: () => {
                return {
                    find: async () => {
                        this.loaderStore.suspend();
                        this.achBatchCurrentNumber = await rootStore.application.administration.donationStore.achBatchCurrentNumber({ increment: false });
                        if(this.paymentTypeDropdownStore && this.paymentTypeDropdownStore.value != null) {
                            this.loaderStore.suspend();
                            await this.getPendingDonations();
                            this.loaderStore.resume();
                            return {
                                item: this.data,
                                totalRecords: this.data.length
                            };
                        } else {
                            return {
                                item: [],
                                totalRecords: 0
                            }
                        }
                        
                    }
                }
            }
        });
        this.loaderStore.suspend();
        this.createPaymentTypeDropdownStore();
        this.createTableStore(this.getPendingDonationsByCharityId);
        this.loaderStore.resume();
        this.createDonationLogModalParams();
    }

    @action.bound
    onChangeChecked(dataItem, grantId, checked) {
        const data = this.tableStore.data.map(item => {
            if (item.id === dataItem.id) {
                item.pendingDonations = item.pendingDonations.map(element => {
                    if (element.id === grantId) {
                        element.checked = checked;
                    }
                    return element;
                })
                const parentCheck = item.pendingDonations.some((s) => s.checked);
                if (parentCheck) {
                    item.checked = true;
                    if (!this.tableStore.selectedItems.some((f) => f.id === item.id)) {
                        this.tableStore.selectedItems.push(item);
                    }
                }
                else {
                    item.checked = false;
                    _.remove(this.tableStore.selectedItems, item);
                }
            }
            return item;
        });

        this.tableStore.updateDataItems(data);
    }

    @action.bound
    async onIsTransferToCharityAccountChange(event) {
        this.isTransferToCharityAccount = event.target.checked;
    }

    @action.bound
    async onAchNextPaymentNumberClick() {
        this.achBatchCurrentNumber = await this.rootStore.application.administration.donationStore.achBatchCurrentNumber({ increment: true });
        this.form.$('paymentNumber').set(this.achBatchCurrentNumber.toString());
    }

    @action.bound
    async onReviewClick(formValues) {
        try {
            this.tableStore.suspend();
            if (this.tableStore.selectedItems.length === 0) {
                this.tableStore.resume();
                this.rootStore.notificationStore.warning('Please, check if you selected grants/donations to process.');
                return;
            }
            
            var data = await this.rootStore.application.administration.donationStore.reviewPendingDonations(formValues);
            this.rootStore.notificationStore.success("Successfully processed.");
            this.achBatchCurrentNumber = await this.rootStore.application.administration.donationStore.achBatchCurrentNumber({ increment: false });
            await this.downloadReport(data.response, this.paymentTypeDropdownStore.value.id);
            this.paymentTypeDropdownStore.setValue(null);
            this.form.clear();
            this.queryUtility.fetch();
            this.tableStore.resume();
        } catch (error) {
            this.tableStore.resume();
            if(error.data) {
                this.rootStore.notificationStore.error(error.data.message);
            } else {
                this.rootStore.notificationStore.error("Something went wrong.");
            }
        }
        return data;
    }

    @action.bound
    async getPendingDonationsByCharityId(charityId, address) {
        var data = await this.rootStore.application.administration.donationStore.getPendingDonationsByCharityId(charityId, address);
        this.data = data.map(e => { return { ...e, checked: false } });
        return this.data;
    }

    @action.bound
    async getPendingDonations() {
        var data = await this.rootStore.application.administration.donationStore.findPendingDonation({ paymentType: this.paymentTypeDropdownStore.value ? this.paymentTypeDropdownStore.value.abrv : 'all' });
        this.data = data.map(e => { return { ...e, id: e.charityId + '_' + e.charityAddress, checked: false } });
    }

    async downloadReport(ids, paymentTypeId) {
        let extension = 'pdf';
        let contentType = 'application/pdf';
        if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
            contentType = 'text/csv';
            extension = 'csv'
        }
        const report = await this.rootStore.application.administration.reconcileStore.generateReport({ contentType, ids, paymentTypeId });
        const nowDate = new Date();
        const fileName = `${"Receipt".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.${extension}`;
        saveAs(report.data, fileName);
        this.rootStore.notificationStore.success("Report generated.");
    }

    createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const data = await this.rootStore.application.lookup.paymentTypeStore.find();
                    const availablePaymentTypes = ['check', 'ach', 'charity-account'];
                    //data.unshift({ id: '0000000-0000-0000-0000-000000000000', abrv: 'all', name: 'All' });
                    //TODO select All as default option
                    return data.filter(c => { return availablePaymentTypes.includes(c.abrv) })
                },
                onChange: async (item) => {
                    this.tableStore.clearSelected();
                    if (item) {
                        this.loaderStore.suspend();
                        await this.getPendingDonations(this.paymentTypeDropdownStore.value.abrv);
                        this.loaderStore.resume();
                        this.tableStore.setData(this.data);
                    }
                }
            });
    }

    createTableStore(loadMethod) {
        this.setTableStore(
            new SelectTableWithLoadOnDemand(
                this.queryUtility, {
                columns: [
                    {
                        key: 'id',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                return <div>
                                    {item.name} <small style={{ display: "block" }}>{item.charityAddress}</small>
                                </div>
                            }
                        },
                    },
                    {
                        key: 'isACHAvailable',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ACH_AVAILABLE_LABEL',
                        format: {
                            type: 'boolean',
                            value: 'yes-no'
                        },
                    },
                    {
                        key: 'amount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'currency',
                            value: '$'
                        },
                    },
                    {
                        key: 'onlineCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ONLINE_LABEL'
                    },
                    {
                        key: 'charityWebsiteCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_WEBSITE_LABEL'
                    },
                    {
                        key: 'grantRequestCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GRANT_REQUEST_LABEL'
                    },
                    {
                        key: 'givingCardCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GIVING_CARD_LABEL'
                    },
                    {
                        key: 'sessionCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.SESSION_LABEL'
                    },
                ],
                actions: {},
                disablePaging: true,
                onSelect: (dataItem, isRemoving) => {
                    const data = this.tableStore.data.map(item => {
                        if (item.id === dataItem.id) {
                            if (item.pendingDonations) {
                                item.pendingDonations = item.pendingDonations.map(element => {
                                    element.checked = !isRemoving;
                                    item.checked = true;
                                    return element;
                                });
                            }
                        }
                        return item;
                    });
                    this.tableStore.updateDataItems(data);
                },
                onSelectAll: (e) => {
                    const data = this.tableStore.data.map(item => {
                        if (item.pendingDonations) {
                            item.pendingDonations = item.pendingDonations.map(element => {
                                element.checked = e.target.checked;
                                return element;
                            })
                        }
                        return item;
                    });
                    this.tableStore.updateDataItems(data);
                }
            },
                true, loadMethod));
    }

    @action.bound
    async openDonationLogModalClick() {
        this.donationLogModalParams.open({

            onAfterAction: () => {
                this.getResource(this.id);
                this.createModal.close();
            }
        });
    }

    createDonationLogModalParams() {
        this.donationLogModalParams = new ModalParams({});
    }

}

export default PendingDonationViewStore;
