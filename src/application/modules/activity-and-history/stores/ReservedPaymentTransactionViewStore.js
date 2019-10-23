import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ActivityAndHistoryService } from 'application/activity-and-history/services';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';

@applicationContext
class ReservedPaymentTransactionViewStore extends BaseListViewStore {
    constructor(rootStore, { donorAccountId }) {
        let filter = new ActivityAndHistoryListFilter();
        filter.donorAccountId = donorAccountId;

        super(rootStore, {
            name: 'activity-and-history',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                disableChangeOrder: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = donorAccountId;
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
}

export default ReservedPaymentTransactionViewStore;
