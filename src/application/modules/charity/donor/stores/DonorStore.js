import {
    DonorService
} from 'application/common/donor/services';

class DonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
    }

    async findDonors(params) {
        const response = await this.donorService.find(params);
        return response.data;
    }

    async searchAccountManager(params) {
        const response = await this.donorService.searchAccountManager(params);
        return response.data;
    }

    async searchDonor(params) {
        const response = await this.donorService.search(params);
        return response.data;
    }

    async getDonorLoginProfile(id) {
        const response = await this.donorService.getDonorLoginProfile(id);
        return response.data;
    }

    async getDonor(id, options) {
        const response = await this.donorService.getDonor(id, options);
        return response.data;
    }

    async getThirdPartyWebsiteSetting(id, options) {
        const response = await this.donorService.getThirdPartyWebsiteSetting(id, options);
        return response.data;
    }

    async getCertificateSetting(id, options) {
        const response = await this.donorService.getCertificateSetting(id, options);
        return response.data;
    }

    async getAutomaticContributionSetting(id, options) {
        const response = await this.donorService.getAutomaticContributionSetting(id, options);
        return response.data;
    }

    async fundNameExists(params) {
        const response = await this.donorService.fundNameExists(params);
        return response;
    }

    async phoneNumberExists(params) {
        const response = await this.donorService.phoneNumberExists(params);
        return response;
    }

    async createAccount(resource) {
        const response = await this.donorService.create(resource);
        return response.data;
    }

    async createAutomaticContributionSetting(resource) {
        const response = await this.donorService.createAutomaticContributionSetting(resource);
        return response.data;
    }

    async updateGrantFees(resource) {
        const response = await this.donorService.updateGrantFees(resource);
        return response.data;
    }

    async updateGeneralData(resource) {
        const response = await this.donorService.updateGeneralData(resource);
        return response.data;
    }

    async updateAccountSetting(resource) {
        const response = await this.donorService.updateAccountSetting(resource);
        return response.data;
    }

}
export default DonorStore;
