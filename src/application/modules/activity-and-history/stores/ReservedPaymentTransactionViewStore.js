import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ActivityAndHistoryService } from 'application/activity-and-history/services';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';

@applicationContext
class ReservedPaymentTransactionViewStore extends BaseListViewStore {
    constructor(rootStore, { id }) {
        let filter = new ActivityAndHistoryListFilter();
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'activity-and-history',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                }
            },
            actions: () => {
                const service = new ActivityAndHistoryService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        if (params.donorAccountId) {
                            params.embed = [
                                "charity"
                            ];
                            const response = await service.findDonorPendingTransactions(params);

                            if (response.data) {
                                return response.data;
                            }
                            else {
                                return response.data = {}
                            }
                        }
                        else {
                            return {};
                        }
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'description',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_DESCRIPTION_LABEL'
                },
                {
                    key: 'amount',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
            }
        }));
    }

    @action.bound
    setSelectedDonorAccount(donorAccountId) {
        this.queryUtility.filter.set('donorAccountId', donorAccountId);
    }
}

export default ReservedPaymentTransactionViewStore;
