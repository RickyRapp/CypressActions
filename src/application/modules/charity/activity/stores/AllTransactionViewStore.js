import { FilterParams } from 'core/models';
import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';

class AllTransactionViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-all-transaction',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.donationStatusDropdownStore.setValue(null);
                    this.donationTypeDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donationType',
                            'donationStatus'
                        ];
                        return rootStore.application.charity.activityStore.findCharityTransactions({ charityId: this.charityId, ...params });
                    }
                }
            }
        });

        this.charityId = rootStore.userStore.applicationUser.id;
        this.showSearchFilter = true;

        this.createTableStore();
        this.createDonationStatusDropdownStore();
        this.createDonationTypeDropdownStore();
    }

    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_STATUS_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map((status) => { return status.id });
                }
            });
    }

    createDonationTypeDropdownStore() {
        this.donationTypeDropdownStore = new BaasicDropdownStore({
            placeholder: 'DONATION.PAST_GRANT.LIST.FILTER.SELECT_DONATION_TYPE_PLACEHOLDER',
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationTypeStore.find();
                },
                onChange: (donationType) => {
                    this.queryUtility.filter.donationTypeIds = donationType.map((type) => { return type.id });
                }
            });
    }

    createTableStore() {
        this.setTableStore(new SelectTableWithRowDetailsViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentTransaction.dateCreated',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'type',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.TRANSACTION_TYPE_LABEL',
                },
                {
                    key: 'paymentTransaction',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$'
                    }
                },
                {
                    key:'description',
                    title: 'Description',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.paymentTransaction.description ? item.paymentTransaction.description : item.paymentTransaction.paymentTransactionType.description;
                        }
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        },
            true));
    }
}

export default AllTransactionViewStore;
