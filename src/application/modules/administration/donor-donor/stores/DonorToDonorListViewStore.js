import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorToDonorListViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-transaction',
            routes: {
                create: () => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.donor-donor.template')
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return this.rootStore.application.donor.transactionStore.findDonorToDonorTransactions(params);
                    }
                }
            }
        });

        this.createTableStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'emailOrAccountNumber',
                    title: 'DONOR_DONOR_ADMIN.LIST.COLUMNS.EMAIL_ACCOUNT_NUMBER'
                },
                {
                    key: 'fullName',
                    title: 'DONOR_DONOR_ADMIN.LIST.COLUMNS.FULLNAME'
                },
                {
                    key: 'amount',
                    title: 'DONOR_DONOR_ADMIN.LIST.COLUMNS.AMOUNT',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'DONOR_DONOR_ADMIN.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'sender',
                    title: 'DONOR_DONOR_ADMIN.LIST.COLUMNS.SENDER'
                },

            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default DonorToDonorListViewStore;
