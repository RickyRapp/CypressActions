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
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await activityAndHistoryService.find(params);
                    return response;
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
                key: 'userBalance',
                title: 'Current Balance',
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
            },
        ];

        this.loadData();
    }
}

export default ActivityAndHistoryListViewStore;