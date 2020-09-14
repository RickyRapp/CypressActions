import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ActivityAndHistoryService } from 'application/activity-and-history/services';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';

@applicationContext
class SettledPaymentTransactionViewStore extends BaseListViewStore {
    constructor(rootStore, { charityId, donorId }) {
        let filter = new ActivityAndHistoryListFilter();
        filter.charityId = charityId;
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
                    filter.charityId = charityId;
                    filter.donorId = donorId;
                }
            },
            actions: () => {
                const service = new ActivityAndHistoryService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        if (params.charityId || params.donorId) {
                            const response = await service.find(params);
                            return response.data;
                        }
                        else {
                            return {};
                        }
                    }
                }
            }
        });

        this.rootStore = rootStore;
        this.isCharityUser = rootStore.userStore.user.roles.includes('Charities');
        this.isDonorUser = rootStore.userStore.user.roles.includes('Users');

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
                    key: 'paymentTransaction.description',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_DESCRIPTION_LABEL'
                },
                {
                    key: 'paymentTransaction',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$',
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default SettledPaymentTransactionViewStore;
