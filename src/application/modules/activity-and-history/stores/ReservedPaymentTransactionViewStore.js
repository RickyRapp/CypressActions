import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';
import { DonorAccountService } from 'application/donor-account/services';
import _ from 'lodash';

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
                const service = new DonorAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        let options = {};
                        if (params.donorAccountId) {
                            options.embed = [
                                "pendingTransactions",
                                "pendingTransactions.paymentTransaction",
                                "pendingTransactions.paymentTransaction.paymentTransactionType",
                            ];
                            options.fields = [
                                "pendingTransactions"
                            ];
                            const response = await service.get(params.donorAccountId, options);
                            if (response.data) {
                                return _.map(response.data.pendingTransactions, 'paymentTransaction')
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
