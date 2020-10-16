import { BaseListViewStore, DateRangeQueryPickerStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { TransactionListFilter } from 'application/activity/transaction/models';
import { action } from 'mobx';

@applicationContext
class TransactionViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'transaction',
            routes: {},
            queryConfig: {
                filter: new TransactionListFilter(),
                onResetFilter: () => {
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return this.rootStore.application.activity.activityStore.findTransactions({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore();
        this.createDateCreatedDateRangeQueryStore();
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
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentTransaction.dateCreated',
                    title: 'ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'charity',
                    title: 'ACTIVITY.LIST.COLUMNS.CHARITY_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if (item.charity) {
                                return item.charity.name;
                            }
                            else {
                                return item.paymentTransaction.description;
                            }
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
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));
    }
}

export default TransactionViewStore;
