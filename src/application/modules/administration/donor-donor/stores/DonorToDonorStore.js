import { CharityService } from 'application/common/charity/services';
import { DonorToDonorService } from 'application/administration/donor-donor/services';

class DonorToDonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.donorToDonorService = moduleStore.rootStore.createApplicationService(DonorToDonorService);
    }

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

    async createTransaction(resource) {
        const response = await this.donorToDonorService.createTransaction(resource);
        return response.data;
    }

}

export default DonorToDonorStore;