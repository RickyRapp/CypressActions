import { GrantService } from 'application/common/grant/services';
import { DonorToDonorService } from 'application/donor/donor-donor/services';

class DonorToDonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.donorToDonorService = moduleStore.rootStore.createApplicationService(DonorToDonorService);
    }

    async getDonorInformation(id) {
        const response = await this.grantService.getDonorInformation(id);
        return response.data;
    }

    async findDonorToDonorAsync(filter) {
        const response = await this.donorToDonorService.findDonorToDonorAsync(filter);
        return response.data;
    }

    async createTransaction(resource) {
        const response = await this.donorToDonorService.createTransaction(resource);
        return response.data;
    }

    async getDonorToDonorInfo(resource) {
        const response = await this.donorToDonorService.getDonorToDonorInfo(resource);
        return response.data;
    }
}
export default DonorToDonorStore;
