import { BaseListViewStore, DateRangeQueryPickerStore, BaasicDropdownStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { TransactionListFilter } from 'application/donor/activity/transaction/models';
import { action } from 'mobx';
import _ from 'lodash';

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

        this.createTableStore();
        this.createDateCreatedDateRangeQueryStore();
        this.createTransactionTypeStore();
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
            { id: 0, name: 'All Transactions', key: 'all' },
            { id: 1, name: 'All Credit transactions', key: 'credit' },
            { id: 2, name: 'All Debit transaction', key: 'debit' },
            { id: 3, name: 'Fees', key: 'fees' },
            { id: 4, name: 'Icoming/outgoing transfers', key: 'transfers' }
        ];
        this.transactionTypeStore = new BaasicDropdownStore(
            {
                placeholder: 'CHOOSE_TRANSACTION_TYPE'
            },
            {
                onChange: type => {
                    this.queryUtility.filter.paymentTransactionType = transactionTypes[type].key;
                },
            },
            transactionTypes);
        this.transactionTypeStore.setValue(_.find(this.transactionTypeStore.items, { id: 0 }))
    }

    createTableStore() {
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
                        type: 'currency',
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

export default TransactionViewStore;
