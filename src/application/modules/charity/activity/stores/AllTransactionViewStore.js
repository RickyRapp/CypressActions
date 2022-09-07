import { TransactionListFilter } from 'application/donor/activity/transaction/models';
import { BaseListViewStore, BaasicDropdownStore,  TableViewStore, DateRangeQueryPickerStore } from 'core/stores';
import { action, observable, computed } from 'mobx';
import moment from 'moment';
import { orderBy } from 'lodash';
import ReconcileSelectTableWithLoadOnDemand from 'application/administration/donation/stores/ReconcileSelectTableWithLoadOnDemand';


class AllTransactionViewStore extends BaseListViewStore {
	@observable isChecksOnHoldVisible = false;
    
    @computed get accountBalance() {
        return this.rootStore.userStore.userBalances.accountBalance;
    }

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-all-transaction',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            queryConfig: {
                filter: new TransactionListFilter(),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.dateCreatedDateRangeQueryStore.reset();
                    this.transactionTypeStore.setValue(_.find(this.transactionTypeStore.items, { id: 0 }))
                    this.transactionPeriod.setValue(_.find(this.transactionPeriod.items, { id: 0 }))
                    this.showPresentBalance = true;
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        this.ackTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();

                        params.embed = [
                            'donationType',
                            'donationStatus',
                            'donor',
                            'grant'
                        ];
                       
                        const response = await rootStore.application.charity.activityStore.findCharityTransactions({ charityId: this.charityId, ...params });

                        if (params.orderBy === "paymentTransaction") {
                            response.item = orderBy(response.item, "paymentTransaction.amount", params.orderDirection);
                        }

                        return response;
                    }
                }
            }
        });

        this.charityId = rootStore.userStore.applicationUser.id;
        this.showSearchFilter = true;
        this.showPresentBalance = true;

        this.createTableStore();
        this.createDonationStatusDropdownStore();
        this.createDonationTypeDropdownStore();
        this.fetchChecksOnHold();
        this.createDateCreatedDateRangeQueryStore();
        this.createTransactionTypeStore();
        this.createTransactionPeriodStore();

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
        this.setTableStore( new ReconcileSelectTableWithLoadOnDemand(this.queryUtility, {
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
                            return item.description;
                        }
                    },
                    sortable: false
                },
                {
                    key: 'type',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.TRANSACTION_TYPE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if( item.type === "Stock and securities") {
                                return (item.paymentTransaction.charityVirtualTransactions[0] ? this.getTransactionType(item.paymentTransaction.charityVirtualTransactions[0].Deposits[0]) : "Stocks and securities");
                            }

                            if(item.type != null && item.type.includes("Withdraw")){
                                return item.paymentTransaction.description ? item.paymentTransaction.description : item.type;
                            }
                            return item.type;
                        }
                    },
                },
                {
                    key: 'paymentTransaction',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency-charity',
                        value: '$'
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'CHARITY_ACTIVITY.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'function',
                            value: (item) => {
                                if(!this.showPresentBalance) 
                                    return null;
    
                                let formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    });
                                return formatter.format(item.accountBalance);
                            }
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
        }, false, this.getTransactionDetails));
    }

    @action.bound
    async getTransactionDetails(id){
        this.data = await this.rootStore.application.charity.activityStore.getCharityDetailedTransactions(id);
        return this.data;
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

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
    }

    createTransactionPeriodStore() {
        const transactionPeriod = [
            { id: 0, name: 'Past month', key: 0 },
            { id: 1, name: 'Year to date', key: 1 },
            { id: 2, name: 'Past 12 months', key: 2 },
            { id: 3, name: 'All time', key: 3 }
        ];
        
        this.transactionPeriod = new BaasicDropdownStore(
            {
                placeholder: 'CHOOSE_TRANSACTION_TYPE'
            },
            {
                onChange: type => {
                    const currentDate = new Date();
                    const now_utc = Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 0, 0, 0);
                    let start = null;
                    let end = null;
                    if (type === 0) {
                        start = moment(new Date(now_utc)).add(-1, 'months').startOf('month').toDate();
                        end = moment(new Date(now_utc)).add(-1, 'months').endOf('month').toDate();
                    }
                    else if (type == 1) {
                        start = moment(new Date(now_utc)).startOf('year').toDate();
                        end = moment(new Date(now_utc)).toDate();
                    }
                    else if (type === 2) {
                        start = moment(new Date(now_utc)).add(-12, 'months').startOf('month').toDate();
                        end = moment(new Date(now_utc)).toDate();
                    }
                    else if (type == 3) {
                        start = moment(new Date(2000, 1, 1)).toDate();
                        end = moment().toDate();
                    }
                    this.dateCreatedDateRangeQueryStore.value.start = start;
                    this.dateCreatedDateRangeQueryStore.value.end = end;

                    this.queryUtility.filter.dateCreatedFrom = start.toISOString();
                    this.queryUtility.filter.dateCreatedTo = end.toISOString();
                    this.queryUtility.fetch();
                },
            },
            transactionPeriod);
    }

    createTransactionTypeStore() {
        const transactionTypes = [
            { id: 0, name: 'All transactions', key: 'all' },
            { id: 1, name: 'Credit transactions', key: 'credit' },
            { id: 2, name: 'Debit transaction', key: 'debit' },
            { id: 3, name: 'Investments', key: 'investments' },
        ];
        this.transactionTypeStore = new BaasicDropdownStore(
            {
                placeholder: 'CHOOSE_TRANSACTION_TYPE'
            },
            {
                onChange: type => {
                    this.queryUtility.filter.paymentTransactionType = transactionTypes[type].key;
                    this.showPresentBalance = type > 0 ? false : true;
                },
            },
            transactionTypes);
        this.transactionTypeStore.setValue(_.find(this.transactionTypeStore.items, { id: 0 }));
    }

    getTransactionType(grant) {
		if (grant && grant.grantType === "Check") {
			return `${grant.grantType}  ${grant.certificate.booklet.code}-${grant.certificate.code}`;
		} else if (grant && grant.grantType === 'Charity Website') {
			return `Charity website `+ (grant.charity.url && `- ${grant.charity.url} `)+ grant.confirmationNumber;
		}
		else {
			return `${grant.grantType} ${grant.confirmationNumber}`;
		}
	}

}

export default AllTransactionViewStore;
