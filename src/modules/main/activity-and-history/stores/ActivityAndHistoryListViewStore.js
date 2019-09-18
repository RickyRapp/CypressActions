import { action, observable } from 'mobx';
import { ActivityAndHistoryService, DonorAccountService } from "common/data";
import { ActivityAndHistoryListFilter } from 'modules/common/activity-and-history/models';
import { BaasicDropdownStore } from "core/stores";
import { BaseActivityAndHistoryListViewStore } from "modules/common/activity-and-history/stores";
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class ActivityAndHistoryListViewStore extends BaseActivityAndHistoryListViewStore {
    @observable paymentTransaction = null;

    constructor(rootStore) {
        const activityAndHistoryService = new ActivityAndHistoryService(rootStore.app.baasic.apiClient);

        const listViewStore = {
            name: 'activity and history',
            actions: {
                find: async params => {
                    params.embed = [
                        'charity',
                        'paymentTransaction',
                        'paymentTransaction.paymentTransactionStatus',
                        'paymentTransaction.paymentTransactionType'
                    ];

                    const transactions = await activityAndHistoryService.find(params);
                    debugger;
                    this.pendingTransactions = await activityAndHistoryService.findDonorPendingTransactions({ donorAccountId: rootStore.authStore.user.id });
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


        this.loadData();
    }
}

export default ActivityAndHistoryListViewStore;