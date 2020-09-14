import { BaseViewStore } from 'core/stores';
import { DonorInvestmentService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { InvestmentPoolHistoryService } from 'application/investment/services';
import { ModalParams } from 'core/models';
import { DonorInvestmentForm } from 'application/donor/forms';

@applicationContext
class DonorInvestmentListViewStore extends BaseViewStore {
    @observable investments = null;
    @observable investmentPoolsOverview = null;
    @observable donorInvestmentIdForHistory = null;

    form = new DonorInvestmentForm({
        onSuccess: async form => {
            const values = form.values();
            await this.donorInvestmentService.invest(values);
            this.investmentModal.close();
            await this.fetchInvestments();
            this.donorInvestmentIdForHistory = null;
        }
    })

    constructor(rootStore, donorId) {
        super(rootStore);
        this.donorId = donorId;

        this.investmentModal = new ModalParams({})
        this.donorInvestmentService = new DonorInvestmentService(rootStore.application.baasic.apiClient)
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
    openInvestmentModal(donorinvestment, investmentPool) {
        this.form.$("donorInvestmentId").set(donorinvestment.id)

        this.investmentModal.open({
            form: this.form,
            investmentPool: investmentPool
        })
    }

    @action.bound
    openHistory(donorInvestment) {
        this.donorInvestmentIdForHistory = donorInvestment.id
    }

    @action.bound
    async fetchInvestments() {
        const service = new DonorInvestmentService(this.rootStore.application.baasic.apiClient);

        let params = {
            donorId: this.donorId,
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
        this.investmentPoolsOverview = response.data;
    }
}

export default DonorInvestmentListViewStore;
