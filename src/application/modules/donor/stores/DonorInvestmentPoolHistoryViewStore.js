import { BaseListViewStore, TableViewStore } from 'core/stores';
import { DonorInvestmentService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { DonorInvestmentFilter } from 'application/donor/models';

@applicationContext
class DonorInvestmentPoolHistoryViewStore extends BaseListViewStore {
    constructor(rootStore, id) {
        const service = new DonorInvestmentService(rootStore.application.baasic.apiClient);
        const filter = new DonorInvestmentFilter('dateCreated', 'desc');
        filter.id = id;

        super(rootStore, {
            name: 'donor-investment-pool-history',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'paymentTransaction',
                            'paymentTransaction.paymentTransactionType'
                        ];
                        const response = await service.findPoolHistory(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentTransaction',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$',
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$',
                    }
                },
                {
                    key: 'paymentTransaction.description',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default DonorInvestmentPoolHistoryViewStore;
