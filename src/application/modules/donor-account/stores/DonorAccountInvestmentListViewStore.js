import { BaseViewStore } from 'core/stores';
import { DonorAccountInvestmentService } from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { InvestmentPoolHistoryService } from 'application/investment/services';
import { ModalParams } from 'core/models';
import { DonorAccountInvestmentForm } from 'application/donor-account/forms';

@applicationContext
class DonorAccountInvestmentListViewStore extends BaseViewStore {
    @observable investments = null;
    @observable investmentPoolsOverview = null;
    @observable donorAccountInvestmentIdForHistory = null;

    form = new DonorAccountInvestmentForm({
        onSuccess: async form => {
            const values = form.values();
            await this.donorAccountInvestmentService.invest(values);
            this.investmentModal.close();
            await this.fetchInvestments();
        }
    })

    constructor(rootStore) {
        super(rootStore);
        this.donorAccountId = rootStore.routerStore.routerState.params.id;

        this.investmentModal = new ModalParams({})
        this.donorAccountInvestmentService = new DonorAccountInvestmentService(rootStore.application.baasic.apiClient)
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
    openInvestmentModal(donorAccountinvestment, investmentPool) {
        this.form.$("donorAccountInvestmentId").set(donorAccountinvestment.id)

        this.investmentModal.open({
            form: this.form,
            investmentPool: investmentPool
        })
    }

    @action.bound
    openHistory(donorAccountInvestment) {
        this.donorAccountInvestmentIdForHistory = donorAccountInvestment.id
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
