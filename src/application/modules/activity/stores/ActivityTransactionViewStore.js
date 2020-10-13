import { BaasicDropdownStore, BaseListViewStore, DateRangeQueryPickerStore, TableViewStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { ActivityListFilter } from 'application/activity/models';
import { ActivityService } from 'application/activity/services';
import { action, observable } from 'mobx';
import { DonorService } from 'application/donor/services';

@applicationContext
class ActivityTransactionViewStore extends BaseListViewStore {
    @observable donor = null;
    @observable isPendingTransactionVisible = null;
    @observable activeIndex = 0;

    constructor(rootStore) {
        const filter = new ActivityListFilter()
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
                    this.searchDonorDropdownStore.setValue(null);
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
                        else {
                            if (params.donorId) {
                                if (!this.donor || params.donorId != this.donor.id) {
                                    this.donorId = params.donorId;
                                    this.fetchDonorData();
                                }
                            }
                            else {
                                this.donorId = null;
                                this.donor = null;
                            }
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
            this.donorId = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'ACTIVITY.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read'),
                    onClick: this.onDonorTableClick
                },
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
        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'firstName',
                            'lastName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'firstName',
                                'lastName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const response = await donorService.get(id, params);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
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
        debugger
        if (this.donorId) {
            const service = new ActivityService(this.rootStore.application.baasic.apiClient);
            const response = await service.loadDonorData(this.donorId);
            this.donor = response.data;
            this.pendingTransactionTableStore.setData(this.donor.pendingTransactions)
        }
    }

    @action.bound
    async onDonorTableClick(item) {
        this.donorId = item.donorId;
        await this.fetchDonorData();
        this.queryUtility.filter.donorId = this.donorId;
        this.searchDonorDropdownStore.setValue({ id: this.donorId, name: item.donor.donorName });
        this.queryUtility.fetch();
    }

    @action.bound onExpandPendingTransactionClick() {
        this.isPendingTransactionVisible = !this.isPendingTransactionVisible;
    }
}

export default ActivityTransactionViewStore;
