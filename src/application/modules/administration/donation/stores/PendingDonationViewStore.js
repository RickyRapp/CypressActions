import React from 'react';
import { BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { PendingDonationListFilter } from 'application/administration/donation/models';
import { PendingDonationReviewForm } from 'application/administration/donation/forms';
import { SelectTableWithLoadOnDemand } from 'application/administration/donation/stores';

import { action, observable } from 'mobx';
import _ from 'lodash';
import { saveAs } from '@progress/kendo-file-saver';

class PendingDonationViewStore extends BaseListViewStore {
    @observable disableSave = false;
    @observable paymentNumber = '';
    @observable isTransferToCharityAccount = false;
    @observable achBatchCurrentNumber = false;
    data = null;

    form = new PendingDonationReviewForm({
        onSuccess: async () => {
            this.disableSave = true;
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
                    find: async (params) => {
                        var data = this.getPendingDonations(params)
                        this.achBatchCurrentNumber = await rootStore.application.administration.donationStore.achBatchCurrentNumber({ increment: false });
                        return {
                            item: this.data,
                            totalRecords: this.data.length
                        };
                    },
                    getPendingDonations: async (param) => {
                        console.log("get pend!");
                    }
                }
            }
        });

        this.createPaymentTypeDropdownStore();
        this.createTableStore(this.getPendingDonationsByCharityId);
    }

    @action.bound
    onChangeChecked(dataItem, grantId, checked) {
        const data = this.tableStore.data.map(item => {
            if (item.charityId === dataItem.charityId) {
                item.pendingDonations = item.pendingDonations.map(element => {
                    if (element.id === grantId) {
                        element.checked = checked;
                        console.log("checked ", item, element);
                    }
                    return element;
                })
            }
            return item;
        });
        this.tableStore.updateDataItems(data);

        if (checked) {
            if (this.tableStore.data.find(c => c.charityId === dataItem.charityId).pendingDonations.filter(c => c.checked).length ===
                this.tableStore.data.find(c => c.charityId === dataItem.charityId).pendingDonations.length) {
                this.tableStore.selectedItems.push(dataItem);
            }
        }
        else {
            const item = _.find(this.tableStore.selectedItems, e => e.charityId === dataItem.charityId);
            if (item) {
                _.remove(this.tableStore.selectedItems, item);
            }
        }
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
    async onReviewClick(charityId) {
        this.data = await this.getPendingDonationsByCharityId(charityId);
        console.log("onReviewClick", charityId, this.data);
        return data;
    }

    @action.bound
    async getPendingDonationsByCharityId(charityId) {

        var data = await this.rootStore.application.administration.donationStore.getPendingDonationsByCharityId(charityId);
        this.data = data.map(e => { return { ...e, checked: false } });
        console.log("getPendingDonationsByCharityId", charityId, this.data);
        return this.data;
    }

    @action.bound
    async getPendingDonations(params) {
        var data = await this.rootStore.application.administration.donationStore.findPendingDonation(params);
        this.data = data.map(e => { return { ...e, checked: false } });
        console.log(this.data);

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
                    const availablePaymentTypes = ['check', 'ach'];
                    return data.filter(c => { return availablePaymentTypes.includes(c.abrv) })
                },
                onChange: (item) => {
                    this.tableStore.clearSelected();
                    if (item) {
                        if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                            this.tableStore.setData(this.data.filter(c => c.isAchAvailable));
                        }
                        else {
                            this.tableStore.setData(this.data);
                        }
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
                        if (item.charityId === dataItem.charityId && item.pendingDonations) {
                            item.pendingDonations = item.pendingDonations.map(element => {
                                element.checked = !isRemoving;
                                console.log("checked ", item, element);
                                return element;
                            });
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
                                console.log("checked ", item, element);
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
}

export default PendingDonationViewStore;
