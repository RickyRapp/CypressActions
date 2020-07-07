import { BaseListViewStore, TableViewStore } from 'core/stores';
import { DonorAccountInvestmentService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { ModalParams, FilterParams } from 'core/models';
import { DonorAccountInvestmentFilter } from 'application/donor-account/models';

@applicationContext
class DonorAccountInvestmentPoolHistoryViewStore extends BaseListViewStore {
    constructor(rootStore, id) {
        const service = new DonorAccountInvestmentService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'donor-account-investment-pool-history',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                return {
                    find: async () => {
                        let params = {
                            embed: [
                                'investmentPool',
                                'donorAccountInvestmentTransactions',
                                'donorAccountInvestmentTransactions.paymentTransaction',
                                'donorAccountInvestmentTransactions.paymentTransaction.paymentTransactionType'
                            ]
                        };
                        const response = await service.get(id, params);
                        return _.orderBy(response.data.donorAccountInvestmentTransactions, 'dateCreated', 'desc');
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'paymentTransaction',
                    title: 'DONOR_ACCOUNT_INVESTMENT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'transaction-currency',
                        value: '$',
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'DONOR_ACCOUNT_INVESTMENT.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$',
                    }
                },
                {
                    key: 'paymentTransaction.description',
                    title: 'DONOR_ACCOUNT_INVESTMENT.LIST.COLUMNS.DESCRIPTION_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'DONOR_ACCOUNT_INVESTMENT.LIST.COLUMNS.DATE_CREATED_LABEL',
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

export default DonorAccountInvestmentPoolHistoryViewStore;
