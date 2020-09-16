import { BaseListViewStore, DateRangeQueryPickerStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ActivityListFilter } from 'application/activity/models';
import { ActivityService } from 'application/activity/services';
import { action, observable } from 'mobx';

@applicationContext
class TransactionViewStore extends BaseListViewStore {
    @observable donor = null;
    @observable isPendingTransactionVisible = null;
    @observable activeIndex = 0;

    constructor(rootStore) {
        const filter = new ActivityListFilter('dateCreated', 'desc')
        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                filter.donorId = rootStore.routerStore.routerState.queryParams.donorId;
            }
        }

        super(rootStore, {
            name: 'transaction',
            routes: {},
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                const service = new ActivityService(rootStore.application.baasic.apiClient);

                return {
                    find: async (params) => {
                        let userId = null;
                        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.findTransactions({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        if (this.rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = Number(this.rootStore.routerStore.routerState.queryParams.tab);
        }

        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
            this.donorId = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'ACTIVITY.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'charity.name',
                    title: 'ACTIVITY.LIST.COLUMNS.CHARITY_LABEL',
                },
                {
                    key: 'type',
                    title: 'ACTIVITY.LIST.COLUMNS.TRANSACTION_TYPE_LABEL',
                },
                {
                    key: 'status',
                    title: 'ACTIVITY.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'amount',
                    title: 'ACTIVITY.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));

        this.pendingTransactionTableStore = new TableViewStore(null, {
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
                    key: 'paymentTransaction.description',
                    title: 'ACTIVITY.LIST.COLUMNS.PENDING_TRANSACTION_DESCRIPTION_LABEL'
                },
                {
                    key: 'paymentTransaction',
                    title: 'ACTIVITY.LIST.COLUMNS.PENDING_TRANSACTION_AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$',
                    }
                },
            ],
            actions: {}
        });

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    @action
    async handleTabClick(tabIndex) {
        this.activeIndex = tabIndex;
        this.rootStore.routerStore.setQueryParams({ tab: this.activeIndex });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorData()
            ]);
        }
    }

    @action.bound async fetchDonorData() {
        const service = new ActivityService(this.rootStore.application.baasic.apiClient);
        const response = await service.loadDonorData(this.donorId);
        this.donor = response.data;
        this.pendingTransactionTableStore.setData(this.donor.pendingTransactions)
    }

    @action.bound onExpandPendingTransactionClick() {
        this.isPendingTransactionVisible = !this.isPendingTransactionVisible;
    }
}

export default TransactionViewStore;
