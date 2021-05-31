import { action } from 'mobx';
import { TableViewStore, DateRangeQueryPickerStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorRecordActivityFilter } from 'application/administration/donor/models'

@applicationContext
class DonorRecordActivityViewStore extends BaseListViewStore {
    constructor(rootStore, donorId) {
            super(rootStore, {
                name: 'transaction',
                routes: {},
                queryConfig: {
                    filter: new DonorRecordActivityFilter(),
                    onResetFilter: (filter) => {
                        filter.reset();
                    }
                },
                actions: () => {
                    return {
                        find: async (params) => {
                            return this.rootStore.application.donor.transactionStore.findTransactions({ donorId: this.donorId, ...params });

                        }
                    }
                }
            });
    
        this.userId = rootStore.userStore.applicationUser.id;      
        this.donorId = donorId;
        console.log(rootStore.routerStore)
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
                    key: 'userAction',
                    title: 'USER.LIST.COLUMNS.USERNAME'
                },
                {
                    key: 'userEmail',
                    title: 'USER.LIST.COLUMNS.EMAIL'
                },
                {
                    key: 'isApproved',
                    title: 'USER.LIST.COLUMNS.APPROVED'
                },
                {
                    key: 'dateTime',
                    title: 'USER.LIST.COLUMNS.LOCKED_OUT'
                }
            ],
        }));
    }
}

export default DonorRecordActivityViewStore;
