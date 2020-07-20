import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';
import { DonorService } from 'application/donor/services';
import _ from 'lodash';

@applicationContext
class ReservedPaymentTransactionViewStore extends BaseListViewStore {
    constructor(rootStore, { donorId }) {
        let filter = new ActivityAndHistoryListFilter();
        filter.donorId = donorId;

        super(rootStore, {
            name: 'activity-and-history',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                disableChangeOrder: true,
                onResetFilter: (filter) => {
                    filter.donorId = donorId;
                }
            },
            actions: () => {
                const service = new DonorService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        let options = {};
                        if (params.donorId) {
                            options.embed = [
                                "pendingTransactions",
                                "pendingTransactions.paymentTransaction",
                                "pendingTransactions.paymentTransaction.paymentTransactionType",
                            ];
                            options.fields = [
                                "pendingTransactions"
                            ];
                            const response = await service.get(params.donorId, options);
                            if (response.data) {
                                return _.orderBy(_.map(response.data.pendingTransactions, 'paymentTransaction'), ['dateCreated'], ['desc'])
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
            },
            disablePaging: true
        }));
    }
}

export default ReservedPaymentTransactionViewStore;
