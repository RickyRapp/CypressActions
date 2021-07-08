import { CharityService } from 'application/common/charity/services';

class DonorToDonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
    }

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

}

export default DonorToDonorStore;