import { BaseListViewStore, DateRangeQueryPickerStore, BaasicDropdownStore, TableViewStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { TransactionListFilter } from 'application/donor/activity/transaction/models';
import { action } from 'mobx';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class TransactionViewStore extends BaseListViewStore {
    constructor(rootStore, props) {
        super(rootStore, {
            name: 'transaction',
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
                        params.embed = [
                            'paymentTransaction',
                        ]
                        return this.rootStore.application.donor.transactionStore.findTransactions({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.hidePager = props.hidePager;
        this.showPresentBalance = true;

        this.createTableStore();
        this.createDateCreatedDateRangeQueryStore();
        this.createTransactionTypeStore();
        this.createTransactionPeriodStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
    }

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore({ advancedSearch: true });
    }

    createTransactionTypeStore() {
        const transactionTypes = [
            { id: 0, name: 'Transactions Type', key: 'all' },
            { id: 1, name: 'Credit transactions', key: 'credit' },
            { id: 2, name: 'Debit transaction', key: 'debit' },
            { id: 3, name: 'Fees', key: 'fees' },
            { id: 4, name: 'Incoming/outgoing transfers', key: 'transfers' }
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
        this.transactionTypeStore.setValue(_.find(this.transactionTypeStore.items, { id: 0 }))
    }

    createTransactionPeriodStore() {
        //const currentYear = new Date().getFullYear();
        const transactionPeriod = [
            { id: 0, name: 'All time', key: 0 },
            { id: 5, name: 'This week', key: 5 },
            { id: 1, name: 'This month', key: 1 },
            { id: 2, name: 'Past week', key: 2 },
            { id: 3, name: 'Past month', key: 3 },
            { id: 4, name: 'Year to date', key: 4 },
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
                    if (type === 5) {
                        start = moment(new Date(now_utc)).startOf('week').toDate();
                        end = moment(new Date(now_utc)).endOf('week').toDate();
                    }
                    else if (type === 1) {
                        start = moment(new Date(now_utc)).startOf('month').toDate();
                        end = moment(new Date(now_utc)).endOf('month').toDate();
                    }
                    else if (type === 2) {
                        start = moment(new Date(now_utc)).add(-7, 'days').startOf('week').toDate();
                        end = moment(new Date(now_utc)).add(-7, 'days').endOf('week').toDate();
                    }
                    else if (type === 3) {
                        start = moment(new Date(now_utc)).add(-1, 'months').startOf('month').toDate();
                        end = moment(new Date(now_utc)).add(-1, 'months').endOf('month').toDate();
                    }
                    else if (type == 4) {
                        start = moment(new Date(now_utc)).startOf('year').toDate();
                        end = moment(new Date(now_utc)).toDate();
                    }
                    else if (type == 0) {
                        start = moment(new Date(2000, 1, 1));
                        end = moment();
                    }
                    this.queryUtility.filter.dateCreatedFrom = start.toISOString();
                    this.queryUtility.filter.dateCreatedTo = end.toISOString();
                    this.queryUtility.fetch();
                },
            },
            transactionPeriod);
        this.transactionPeriod.setValue(_.find(this.transactionPeriod.items, { id: 0 }))
    }

    createTableStore() {
        if(window.innerWidth > 750) {
            this.setTableStore(new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'paymentTransaction.dateUpdated',
                        title: 'ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                        format: {
                            type: 'date',
                            value: 'short'
                        },
                        cellClass: 'table__cell--date'
                    },
                    {
                        key: 'description',
                        title: 'ACTIVITY.LIST.COLUMNS.CHARITY_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                if(item.paymentTransaction && item.paymentTransaction.description && item.paymentTransaction.description.includes('Refund Contribution'))
                                    return `Declined ${item.description}`;
                                return item.description;
                            }
                        }
                    },
                    {
                        key: 'type',
                        title: 'ACTIVITY.LIST.COLUMNS.TRANSACTION_TYPE_LABEL',
                    },
                    {
                        key: 'paymentTransaction',
                        title: 'ACTIVITY.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'transaction-currency',
                            value: '$'
                        }
                    },
                    {
                        key: 'paymentTransaction.presentBalance',
                        title: 'ACTIVITY.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                        format: {
                            type: 'function',
                            value: (item) => {
                                if(!this.showPresentBalance) 
                                    return null;
    
                                let formatter = new Intl.NumberFormat('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    });
                                return formatter.format(item.paymentTransaction.presentBalance);
                            }
                        }
                    }
                ],
                actions: {
                    onSort: (column) => this.queryUtility.changeOrder(column.key)
                },
                actionsRender: {},
                disableSorting: true,
                disablePaging: this.hidePager
            }));
        } else {
            this.setTableStore(new SelectTableWithRowDetailsViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'paymentTransaction.dateUpdated',
                        title: 'ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                        format: {
                            type: 'date',
                            value: 'short'
                        },
                        cellClass: 'table__cell--date'
                    },
                    {
                        key: 'description',
                        title: 'ACTIVITY.LIST.COLUMNS.CHARITY_LABEL',
                    },
                    {
                        key: 'paymentTransaction',
                        title: 'ACTIVITY.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'transaction-currency',
                            value: '$'
                        }
                    }
                ],
                actions: {
                    onSort: (column) => this.queryUtility.changeOrder(column.key)
                },
                actionsRender: {},
                disableSorting: true,
                disablePaging: this.hidePager
            }));
        }
    }
}

export default TransactionViewStore;
