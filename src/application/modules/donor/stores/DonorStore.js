import { DonorService } from 'application/donor/services';

class DonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
    }

    async createAccount(resource) {
        const response = await this.donorService.create(resource);
        return response.data;
    }

    async findDonors(params) {
        const response = await this.donorService.find(params);
        return response.data;
    }

    async fundNameExists(params) {
        const response = await this.donorService.fundNameExists(params);
        return response;
    }
}
export default DonorStore;
