import { action, observable, runInAction } from 'mobx';
import { ActivityAndHistoryService, DonorAccountService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/common/activity-and-history/models';
import { BaasicDropdownStore } from "core/stores";
import { BaseActivityAndHistoryListViewStore } from "modules/common/activity-and-history/stores";
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import _ from 'lodash';

class ActivityAndHistoryListViewStore extends BaseActivityAndHistoryListViewStore {
    @observable donorAccountSearchDropdownStore = null;
    @observable paymentTransaction = null;

    constructor(rootStore) {
        const activityAndHistoryService = new ActivityAndHistoryService(rootStore.app.baasic.apiClient);
        let filter = new ActivityAndHistoryListFilter();
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';
        filter.embed = ['paymentTransactionStatus', 'paymentTransactionType'];

        const listViewStore = {
            name: 'activity and history',
            actions: {
                find: async params => {
                    return await activityAndHistoryService.find(params);
                }
            },
            queryConfig: {
                filter: new ActivityAndHistoryListFilter()
            }
        };

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);

        this.columns = [
            {
                key: 'amount',
                title: 'Debit/Credit',
                type: 'function',
                function: this.renderAmount
            },
            {
                key: 'availableBalance',
                title: 'Available Balance',
                type: 'currency'
            },
            {
                key: 'presentBalance',
                title: 'Present Balance',
                type: 'currency'
            },
            {
                key: 'dateCreated',
                title: 'Date Created',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
            {
                key: 'paymentTransactionStatusId',
                title: 'Status',
                type: 'function',
                function: this.renderStatus
            },
            {
                key: 'done',
                title: 'Done',
                type: 'bool',
            },
            {
                key: 'details',
                title: 'Details',
                type: 'function',
                function: this.renderText
            }
        ];

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.loadData(this.setAdditionalStores);
    }

    @action.bound async setAdditionalStores() {
        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = getDonorAccountDropdownOptions;

                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onDonorFilterSearch
            }
        );

        if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorAccountId) {
            let params = getDonorAccountDropdownOptions;
            const donorAccount = await this.donorAccountService.get(this.rootStore.routerStore.routerState.queryParams.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
            this.onDonorFilterSearch({ id: this.rootStore.routerStore.routerState.queryParams.donorAccountId })
        }
    }

    @action.bound onDonorFilterSearch(option) {
        this.queryUtility.filter.donorAccountId = option ? option.id : null

        this.queryUtility._reloadCollection();
    }
}

export default ActivityAndHistoryListViewStore;