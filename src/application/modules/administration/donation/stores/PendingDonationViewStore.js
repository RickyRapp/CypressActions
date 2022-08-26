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
        this.createTableStore();
        this.loaderStore.resume();
        this.createDonationLogModalParams();
    }

    @action.bound
    onChangeChecked(dataItem, grantId, checked) {

        const originalIx = this.tableStore.data.findIndex(o => dataItem.id === o.id);

        const item = this.tableStore.data[originalIx];

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

        this.tableStore.updateDataItems();
    }

    @action.bound
    async onIsTransferToCharityAccountChange(event) {
        this.isTransferToCharityAccount = event.target.checked;
    }

    @action.bound
    async onAchNextPaymentNumberClick() {
        this.achBatchCurrentNumber = await this.rootStore.application.administration.donationStore.achBatchCurrentNumber({ increment: true });
        if(this.paymentTypeDropdownStore.value.abrv === 'charity-account')
            this.form.$('paymentNumber').set("CA-" + this.achBatchCurrentNumber.toString());
        else 
            this.form.$('paymentNumber').set(this.achBatchCurrentNumber.toString());
    }

    @action.bound
    async onReviewClick(formValues) {
        try {
            formValues.accountTransferNumber = formValues.paymentNumber;
            if(this.paymentTypeDropdownStore.value.abrv === 'charity-account')
                formValues.paymentNumber = formValues.paymentNumber.slice(3);

            this.tableStore.suspend();
            if (this.tableStore.selectedItems.length === 0) {
                this.tableStore.resume();
                this.rootStore.notificationStore.warning('Please, check if you selected grants/donations to process.');
                return;
            }
            
            const data = await this.rootStore.application.administration.donationStore.reviewPendingDonations(formValues);
            this.rootStore.notificationStore.success("Successfully processed.");
            this.form.$('accountTransferNumber').set(this.form.$('paymentNumber').value);
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
    async getPendingDonationsByCharityId(charityId, address, isWithdraw, bankAccount) {
        const data = await this.rootStore.application.administration.donationStore.getPendingDonationsByCharityId(charityId, address, isWithdraw, bankAccount);
        this.data = data.map(e => { return { ...e, checked: false } });
        return this.data;
    }

    @action.bound
    async getPendingDonations() {
        const data = await this.rootStore.application.administration.donationStore.findPendingDonation({ paymentType: this.paymentTypeDropdownStore.value ? this.paymentTypeDropdownStore.value.abrv : 'all' });
        this.data = data.map(e => { return { ...e, id: e.charityId + '_' + e.charityAddress + '_'+ (e.isWithdraw ? e.isWithdraw + '_' + e.bankAccount : e.isWithdraw), checked: false } });
    }

    async downloadReport(ids, paymentTypeId) {
        if(this.paymentTypeDropdownStore.value.abrv === 'charity-account')
            return;
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

    createTableStore() {
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
                                    {item.name} <small style={{ display: "block" }}>{item.charityAddress}</small>  <small style={{ display: "block" }}>{item.bankAccount}</small>
                                </div>
                            }
                        },
                        sortable: false
                    },
                    {
                        key: 'isACHAvailable',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ACH_AVAILABLE_LABEL',
                        format: {
                            type: 'boolean',
                            value: 'yes-no'
                        },
                        sortable: false
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
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ONLINE_LABEL',
                        sortable: false
                    },
                    {
                        key: 'charityWebsiteCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_WEBSITE_LABEL',
                        sortable: false
                    },
                    {
                        key: 'grantRequestCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GRANT_REQUEST_LABEL',
                        sortable: false
                    },
                    {
                        key: 'givingCardCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GIVING_CARD_LABEL',
                        sortable: false
                    },
                    {
                        key: 'sessionCount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.SESSION_LABEL',
                        sortable: false
                    },
                    {
                        key: 'isWithdraw',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.IS_WITHDRAW',
                        format: {
                            type: 'function',
                            value: (item) => {
                                return item.isWithdraw ? <div className="type--center" ><i class="u-icon u-icon--approve u-icon--base "></i></div> : null;
                            }
                        },
                        sortable: false
                    },
                ],
                actions: {},
                disablePaging: true,
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
                onSelect: (dataItem, isRemoving) => {
                    const originalIx = this.tableStore.data.findIndex(o => dataItem.id === o.id);
                    const item = this.tableStore.data[originalIx];

                    if (item.pendingDonations) {
                        item.pendingDonations = item.pendingDonations.map(element => {
                            element.checked = !isRemoving;
                            item.checked = true;
                            return element;
                        });

                        this.tableStore.updateDataItems();
                    }
                },
                onSelectAll: (e) => {
                    this.tableStore.data.forEach(item => {
                        if (item.pendingDonations) {
                            item.pendingDonations = item.pendingDonations.map(element => {
                                element.checked = e.target.checked;
                                return element;
                            })
                        }
                    });
                }
            }, true, this.getPendingDonationsByCharityId));
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
