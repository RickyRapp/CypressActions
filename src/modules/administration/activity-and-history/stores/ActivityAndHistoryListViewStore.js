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

        const listViewStore = {
            name: 'activity and history',
            actions: {
                find: async params => {
                    params.embed = [
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
                        'charity',
                        'paymentTransaction',
                        'paymentTransaction.paymentTransactionStatus',
                        'paymentTransaction.paymentTransactionType'
                    ];

                    const transactions = await activityAndHistoryService.find(params);

                    if (params.donorAccountId) {
                        this.pendingTransactions = await activityAndHistoryService.findDonorPendingTransactions(params);
                    }
                    else {
                        this.pendingTransactions = null;
                    }
                    return transactions;
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
                key: 'dateCreated',
                title: 'CREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
            {
                key: 'paymentTransaction.description',
                title: 'DESCRIPTION'
            },
            {
                key: 'paymentTransaction.amount',
                title: 'Debit/Credit',
                type: 'function',
                function: (item) => this.renderAmount(item.paymentTransaction)
            },
            {
                key: 'paymentTransaction.presentBalance',
                title: 'BALANCE',
                type: 'currency'
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