import { FilterParams, ModalParams } from 'core/models';
import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore, TableViewStore } from 'core/stores';
import { action, observable } from 'mobx';

class AllTransactionViewStore extends BaseListViewStore {
	@observable isChecksOnHoldVisible = false;

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
                            'donationStatus',
                            'donor'
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
        this.fetchChecksOnHold();

        this.checksOnHoldTableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.CHARITY_LABEL'
                },
                {
                    key: 'certificate.code',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return `${item.certificate.booklet.code}-${item.certificate.code}`
                        }
                    }
                },
                {
                    key: 'certificate.denominationType',
                    title: 'ACTIVITY.CHECK.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'denomination',
                        additionalField: 'certificate.openCertificateAmount',
                        value: 'short'
                    }
                },
            ],
            actions: {},
            actionsRender: {}
        });

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
        this.setTableStore( new TableViewStore(this.queryUtility, {
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
                    key:'description',
                    title: 'Description',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.paymentTransaction.description ? ('Grant: '+ item.donor.donorName) : item.paymentTransaction.paymentTransactionType.description;
                        }
                    }
                },
                {
                    key: 'type',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.TRANSACTION_TYPE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.type === "Withdraw" ? "Withdraw" :  item.paymentTransaction.charityVirtualTransactions[0].grants[0].grantType + ' ' +item.paymentTransaction.charityVirtualTransactions[0].grants[0].confirmationNumber;
                        }
                    }
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

    @action.bound
    async fetchChecksOnHold() {
        const statuses = await this.rootStore.application.lookup.sessionPendingCertificateStatusStore.find();
        const data = await this.rootStore.application.donor.transactionStore.findPendingCharityCheck(
            {
                charityId: this.rootStore.userStore.applicationUser.id,
                sessionPendingCertificateStatusIds: statuses.find(c => c.abrv === 'pending').id,
                embed: 'charity,certificate,certificate.booklet,certificate.denominationType,certificate.booklet.bookletOrder,certificate.booklet.bookletOrder.donor',
                sort: 'dateCreated|desc',
                page: 1,
                rpp: 1000
            });
        this.checksOnHoldTableStore.setData(data.item);
        if (!this.checksOnHoldTableStore.dataInitialized) {
            this.checksOnHoldTableStore.dataInitialized = true;
        }
    }


    
	@action.bound
    onExpandChecksOnHoldClick() {
        this.isChecksOnHoldVisible = !this.isChecksOnHoldVisible;
    }

}

export default AllTransactionViewStore;
