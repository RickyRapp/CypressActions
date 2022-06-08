import { ContributionReviewService, ContributionService } from 'application/common/contribution/services';
import { DonorBankAccountService } from 'application/common/donor/services';

class ContributionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.contributionService = moduleStore.rootStore.createApplicationService(ContributionService);
        this.donorBankAccountService = moduleStore.rootStore.createApplicationService(DonorBankAccountService);
        this.contributionReviewService = moduleStore.rootStore.createApplicationService(ContributionReviewService);
    }

    async findContribution(params) {
        const response = await this.contributionService.find(params);
        return response.data;
    }

    async findBankAccount(params) {
        const response = await this.donorBankAccountService.find(params);
        return response.data.item;
    }

    async getDonorInformation(id) {
        const response = await this.contributionService.getDonorInformation(id);
        return response.data;
    }

    async getContribution(id, params) {
        const response = await this.contributionService.get(id, params);
        return response.data;
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

    async achBatchCurrentNumber(resource) {
        const response = await this.contributionService.achBatchCurrentNumber(resource);
        return response.data;
    }

    async generateCsvContributionFile(resource) {
        const response = await this.contributionService.generateCsvContributionFile(resource);
        return response.data;
    }

    async findContributionAchReviews(params) {
        const response = await this.contributionReviewService.findContributionAchReviews(params);
        return response.data.item;
    }

    async reviewBatchToProcess(params) {
       await this.contributionReviewService.reviewBatchToProcess(params);
    }
    
}
export default ContributionStore;
