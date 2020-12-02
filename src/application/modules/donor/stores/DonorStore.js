import { DonorService } from 'application/donor/services';

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

    async getDonorLoginProfile(id) {
        const response = await this.donorService.getDonorLoginProfile(id);
        return response.data;
    }

    async getDonor(id, options) {
        const response = await this.donorService.getDonor(id, options);
        return response.data;
    }

    async createAccount(resource) {
        const response = await this.donorService.create(resource);
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

    async fundNameExists(params) {
        const response = await this.donorService.fundNameExists(params);
        return response;
    }

    async phoneNumberExists(params) {
        const response = await this.donorService.phoneNumberExists(params);
        return response;
    }
}
export default DonorStore;
