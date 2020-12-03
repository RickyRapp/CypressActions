import { DonorInvestmentService, InvestmentService } from 'application/investment/services';

class InvestmentStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorInvestmentService = moduleStore.rootStore.createApplicationService(DonorInvestmentService);
        this.investmentService = moduleStore.rootStore.createApplicationService(InvestmentService);
    }

    async findDonorInvestments(filter) {
        const response = await this.donorInvestmentService.find(filter)
        return response.data;
    }

    async findOverview(filter) {
        const response = await this.investmentService.overview(filter)
        return response.data;
    }

    async findHistory(filter) {
        const response = await this.investmentService.find(filter)
        return response.data;
    }

    async hasInvestments(donorId) {
        const response = await this.donorInvestmentService.hasInvestments(donorId)
        return response.data;
    }

    async invest(resource) {
        const response = await this.donorInvestmentService.invest(resource)
        return response.data;
    }

    async updatePoolChange(resource) {
        const response = await this.investmentService.update(resource)
        return response.data;
    }
}
export default InvestmentStore;
