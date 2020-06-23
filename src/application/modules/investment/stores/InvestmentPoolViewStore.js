import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { InvestmentPoolHistoryService } from 'application/investment/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';

@applicationContext
class InvestmentPoolViewStore extends BaseListViewStore {
    @observable investmentPoolDetailsId = null;
    constructor(rootStore) {
        super(rootStore, {
            name: 'investment',
            routes: {},
            queryConfig: {
                filter: new FilterParams()
            },
            actions: () => {
                const service = new InvestmentPoolHistoryService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['investmentPool']
                        const response = await service.overview(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'investmentPool.name',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.NAME'
                },
                {
                    key: 'currentValue',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.VALUE',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'change',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.CHANGE',
                    format: {
                        type: 'percentage',
                        decimalScale: 6
                    }
                },
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onSelect: (item) => this.investmentPoolDetailsId = item.investmentPool.id
            },
            disablePaging: true,
            disableSorting: true
        }));

        this.investmentPoolChangeModal = new ModalParams({});
    }

    @action.bound
    openInvestmentPoolChange() {
        this.investmentPoolChangeModal.open({
            onAfterAction: () => {
                this.queryUtility.fetch();
                this.investmentPoolChangeModal.close();
            }
        });
    }
}

export default InvestmentPoolViewStore;
