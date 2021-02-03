import { BaseListViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { FilterParams } from 'core/models';
import { observable } from 'mobx';

@applicationContext
class DonorInvestmentPoolViewStore extends BaseListViewStore {
    @observable investmentPools = null;

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
                        params.embed = ['investmentPool,donorInvestmentTransactions']
                        debugger
                        return rootStore.application.donor.investmentStore.findDonorInvestments({ donorId: this.donorId, ...params });
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore();
        this.loadLookups();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'investmentPool.name',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.NAME'
                },
                {
                    key: 'balance',
                    title: 'DONOR_INVESTMENT.LIST.COLUMNS.AMOUNT',
                    format: {
                        type: 'currency'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
            }
        }));

    }

    async loadLookups() {
        this.investmentPools = await this.rootStore.application.lookup.investmentPoolStore.find();
    }
}

export default DonorInvestmentPoolViewStore;
