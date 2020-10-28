import { SelectTableWithRowDetailsViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { FilterParams } from 'core/models';
import { action, observable } from 'mobx';
import _ from 'lodash';

class DonationReviewViewStore extends BaseListViewStore {
    @observable disableSave = false;
    @observable paymentNumber = '';
    @observable isTransferToCharityAccount = false;

    constructor(rootStore) {
        const filter = new FilterParams();
        filter.pageSize = 1000;
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
                        params.embed = [
                            'charity'
                        ];

                        const data = await rootStore.application.donation.donationStore.findPendingDonation(params);
                        return {
                            item: data,
                            totalRecords: data.length
                        };
                    }
                }
            }
        });

        this.createPaymentTypeDropdownStore();
        this.createTableStore();
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
            }
            return item;
        });
        this.tableStore.updateDataItems(data);

        if (checked) {
            if (this.tableStore.data.find(c => c.id === dataItem.id).pendingDonations.filter(c => c.checked).length ===
                this.tableStore.data.find(c => c.id === dataItem.id).pendingDonations.length) {
                this.tableStore.selectedItems.push(dataItem);
            }
        }
        else {
            const item = _.find(this.tableStore.selectedItems, e => e.id === dataItem.id);
            if (item) {
                _.remove(this.tableStore.selectedItems, item);
            }
        }
    }

    @action.bound
    async onPaymentNumberChange(event) {
        this.paymentNumber = event.target.value;
    }

    @action.bound
    async onIsTransferToCharityAccountChange(event) {
        this.isTransferToCharityAccount = event.target.checked;
    }

    @action.bound
    async onReviewClick() {
        this.disableSave = true;
        await this.rootStore.application.donation.donationStore.reviewPendingDonations(
            {
                paymentNumber: this.isTransferToCharityAccount ? null : this.paymentNumber,
                paymentTypeId: this.isTransferToCharityAccount ? null : this.paymentTypeDropdownStore.value.id,
                isTransferToCharityAccount: this.isTransferToCharityAccount,
                groupedPendingDonations: this.tableStore.data
            });
        this.disableSave = false;
    }

    createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const data = await this.rootStore.application.lookup.paymentTypeStore.find();
                    const availablePaymentTypes = ['check', 'ach'];
                    return data.filter(c => { return availablePaymentTypes.includes(c.abrv) })
                },
            });
    }

    createTableStore() {

        this.setTableStore(
            new SelectTableWithRowDetailsViewStore(
                this.queryUtility, {
                columns: [
                    {
                        key: 'charityName',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_LABEL'
                    },
                    {
                        key: 'totalAmount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'currency',
                            value: '$'
                        },
                    },
                    {
                        key: 'online',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ONLINE_LABEL'
                    },
                    {
                        key: 'charityWebsite',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_WEBSITE_LABEL'
                    },
                    {
                        key: 'grantRequest',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GRANT_REQUEST_LABEL'
                    },
                    {
                        key: 'givingCard',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GIVING_CARD_LABEL'
                    },
                    {
                        key: 'session',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.SESSION_LABEL'
                    },
                ],
                actions: {},
                disablePaging: true,
                onSelect: (dataItem, isRemoving) => {
                    const data = this.tableStore.data.map(item => {
                        if (item.id === dataItem.id) {
                            item.pendingDonations = item.pendingDonations.map(element => {
                                element.checked = !isRemoving;
                                return element;
                            })
                            return item;
                        }
                        else {
                            return item;
                        }
                    });
                    this.tableStore.updateDataItems(data);
                },
                onSelectAll: (e) => {
                    const data = this.tableStore.data.map(item => {
                        item.pendingDonations = item.pendingDonations.map(element => {
                            element.checked = e.target.checked;
                            return element;
                        })
                        return item;
                    });
                    this.tableStore.updateDataItems(data);
                }
            },
                true));
    }
}

export default DonationReviewViewStore;
