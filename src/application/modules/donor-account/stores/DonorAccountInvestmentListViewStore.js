import { BaseViewStore } from 'core/stores';
import { DonorAccountInvestmentService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { InvestmentPoolHistoryService } from 'application/investment/services';

@applicationContext
class DonorAccountInvestmentListViewStore extends BaseViewStore {
    @observable investments = null;
    @observable investmentPoolsOverview = null;

    constructor(rootStore) {
        super(rootStore);
        this.donorAccountId = rootStore.routerStore.routerState.params.id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchInvestments(),
                this.fetchInvestmentPoolsOverview()
            ]);
        }
    }

    @action.bound
    async fetchInvestments() {
        const service = new DonorAccountInvestmentService(this.rootStore.application.baasic.apiClient);

        let params = {
            donorAccountId: this.donorAccountId,
            orderBy: 'dateCreated',
            orderDirection: 'desc'
        }

        const response = await service.find(params);
        this.investments = response.data.item;
    }

    @action.bound
    async fetchInvestmentPoolsOverview() {
        const service = new InvestmentPoolHistoryService(this.rootStore.application.baasic.apiClient);
        let params = { embed: ['investmentPool'] };
        const response = await service.overview(params);
        this.investmentPoolsOverview = response.data.item;
    }
}

export default DonorAccountInvestmentListViewStore;
