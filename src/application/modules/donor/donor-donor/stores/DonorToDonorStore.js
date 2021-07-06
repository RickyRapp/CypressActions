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

    async findRecipient(id) {
        const response = await this.donorToDonorService.findRecipient(id);
        return response.data;
    }

}
export default DonorToDonorStore;
