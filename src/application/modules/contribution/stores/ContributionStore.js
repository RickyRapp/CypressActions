import { ContributionService } from 'application/contribution/services';
import { DonorService } from 'application/donor/services';
import { DonorBankAccountService } from 'application/donor/services';

class ContributionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.contributionService = moduleStore.rootStore.createApplicationService(ContributionService);
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.donorBankAccountService = moduleStore.rootStore.createApplicationService(DonorBankAccountService);
    }

    async findContribution(params) {
        const response = await this.contributionService.find(params);
        return response.data;
    }

    async getDetails(id, params) {
        const response = await this.contributionService.get(id, params);
        return response.data;
    }

    async getDonor(id, params) {
        const response = await this.donorService.get(id, params);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.contributionService.getDonorInformation(id);
        return response.data;
    }

    async searchDonor(params) {
        const response = await this.donorService.search(params);
        return response.data.item;
    }

    async findBankAccount(params) {
        const response = await this.donorBankAccountService.find(params);
        return response.data.item;
    }

    async reviewContribution(resource) {
        const response = await this.contributionService.review(resource);
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

}
export default ContributionStore;
