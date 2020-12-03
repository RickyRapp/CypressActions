import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
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
                return {
                    find: async (params) => {
                        params.embed = ['investmentPool']
                        return rootStore.application.investment.investmentStore.findOverview(params);
                    }
                }
            }
        });

        this.createTableStore();
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

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'investmentPool.name',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.NAME'
                },
                {
                    key: 'currentShareValue',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.CURRENT_SHARE_VALUE',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'totalPoolValue',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.TOTAL_VALUE_IN_POOL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'numberOfShares',
                    title: 'INVESTMENT_POOL.LIST.COLUMNS.NUMBER_OF_SHARES'
                },
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onSelect: (item) => this.investmentPoolDetailsId = item.investmentPool.id
            },
            disablePaging: true,
            disableSorting: true
        }));
    }
}

export default InvestmentPoolViewStore;
