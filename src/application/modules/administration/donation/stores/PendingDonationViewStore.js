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
            console.log("form1 ", this.tableStore.selectedItems, this.form.values());
            this.form.$('selectedItems').set(this.tableStore.selectedItems);
            console.log("form2 ", this.tableStore.selectedItems, this.form.values());
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
                        await this.getPendingDonations(params);
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
        console.log('on change checked', dataItem, grantId, checked);
        var elItem = {};
        const data = this.tableStore.data.map(item => {
            if (item.id === dataItem.id) {
                item.pendingDonations = item.pendingDonations.map(element => {
                    if (element.id === grantId) {
                        element.checked = checked;
                        elItem = element;
                        console.log("checked ", item, element);
                    }
                    return element;
                })
            }
            return item;
        });
        this.tableStore.updateDataItems(data);

        if (checked) {
            if (elItem) {
                this.tableStore.selectedItems.push(elItem);
                console.log('adding to selected... ', elItem.id, elItem, this.tableStore.selectedItems);
            }
            // if (this.tableStore.data.find(c => c.id === dataItem.id).pendingDonations.filter(c => c.checked).length ===
            //     this.tableStore.data.find(c => c.id === dataItem.id).pendingDonations.length) {
            //     this.tableStore.selectedItems.push(dataItem);
            //     console.log('adding to selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
            // }
            // else {
            //     this.tableStore.selectedItems.push(dataItem);
            //     console.log('adding item to selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
            // }
        }
        else {
            const item = _.find(this.tableStore.selectedItems, e => e.id === grantId);
            if (item) {
                _.remove(this.tableStore.selectedItems, item);
                console.log('removing from selected... ', item.id, item, this.tableStore.selectedItems);
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
    async onReviewClick(formValues) {
        //this.data = await this.getPendingDonationsByCharityId(charityId);
        var data = await this.rootStore.application.administration.donationStore.reviewPendingDonations(formValues);
        console.log("onReviewClick", formValues, data);
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
    async getPendingDonations() {
        var data = await this.rootStore.application.administration.donationStore.findPendingDonation({ paymentType: this.paymentTypeDropdownStore.value });
        this.data = data.map(e => { return { ...e, id: e.charityId + '_' + e.charityAddress, checked: false } });
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
                    const availablePaymentTypes = ['all', 'check', 'ach'];
                    data.unshift({ id: '0000000-0000-0000-0000-000000000000', abrv: 'all', name: 'All' });
                    //TODO select All as default option
                    return data.filter(c => { return availablePaymentTypes.includes(c.abrv) })
                },
                onChange: async (item) => {
                    this.tableStore.clearSelected();
                    if (item) {
                        await this.getPendingDonations(this.paymentTypeDropdownStore.value.abrv);
                        this.tableStore.setData(this.data);
                        //if (this.paymentTypeDropdownStore.value.abrv === 'ach') {
                        //this.tableStore.setData(this.data.filter(c => c.isAchAvailable));
                        //}
                        //else {
                        //    this.tableStore.setData(this.data);
                        //}
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
                    console.log('charity selected', dataItem, isRemoving);
                    const data = this.tableStore.data.map(item => {
                        if (item.charityId === dataItem.charityId && item.pendingDonations) {
                            item.pendingDonations = item.pendingDonations.map(element => {
                                element.checked = !isRemoving;
                                if (isRemoving) {
                                    _.remove(this.tableStore.selectedItems, dataItem);
                                    console.log('removing charity item from selected... ', element, this.tableStore.selectedItems);
                                }
                                else {
                                    this.tableStore.selectedItems.push(element);
                                    console.log('adding charity item to selected... ', element, this.tableStore.selectedItems);
                                }
                                console.log("checked ", item, element);
                                return element;
                            });
                            if (isRemoving) {
                                _.remove(this.tableStore.selectedItems, dataItem);
                                console.log('removing charity group from selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
                            }
                            else {
                                this.tableStore.selectedItems.push(dataItem);
                                console.log('adding charity group to selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
                            }
                        }
                        else {
                            if (item.charityId === dataItem.charityId) {
                                if (isRemoving) {
                                    _.remove(this.tableStore.selectedItems, dataItem);
                                    console.log('removing charity from selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
                                }
                                else {
                                    this.tableStore.selectedItems.push(dataItem);
                                    console.log('adding charity to selected... ', dataItem.id, dataItem, this.tableStore.selectedItems);
                                }
                            };
                        }
                        return item;
                    });
                    //this.tableStore.updateDataItems(data);
                },
                onSelectAll: (e) => {
                    console.log('all charities selected', e);
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
                    //this.tableStore.updateDataItems(data);
                }
            },
                true, loadMethod));
    }
}

export default PendingDonationViewStore;
