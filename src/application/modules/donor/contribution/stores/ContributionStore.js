import { ContributionService } from 'application/common/contribution/services';
import { DonorBankAccountService } from 'application/common/donor/services';

class ContributionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.contributionService = moduleStore.rootStore.createApplicationService(ContributionService);
        this.donorBankAccountService = moduleStore.rootStore.createApplicationService(DonorBankAccountService);
    }

    async getDonorInformation(id) {
        const response = await this.contributionService.getDonorInformation(id);
        return response.data;
    }

    async getContribution(id, params) {
        const response = await this.contributionService.get(id, params);
        return response.data;
    }

    async findContribution(params) {
        const response = await this.contributionService.find(params);
        return response.data;
    }

    async findTimelineSummary(params) {
        const response = await this.contributionService.findSummary(params);
        return response.data;
    }

    async findBankAccount(params) {
        const response = await this.donorBankAccountService.find(params);
        return response.data.item;
    }

    async createContribution(resource) {
        const response = await this.contributionService.create(resource);
        return response.data;
    }

    async updateContribution(resource) {
        const response = await this.contributionService.update(resource);
        return response.data;
    }

    async reviewContribution(resource) {
        const response = await this.contributionService.review(resource);
        return response.data;
    }

    async getDetails(id, params) {
        const response = await this.contributionService.getDetails(id, params);
        return response.data;
    }
}
export default ContributionStore;
