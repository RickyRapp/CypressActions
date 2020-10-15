import { CharityService } from 'application/charity/services';
import { GrantService } from 'application/grant/services';
import { FeeService } from 'common/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.feeService = moduleStore.rootStore.createApplicationService(FeeService);
    }

    async getDonorInformation(id) {
        const response = await this.grantService.getDonorInformation(id);
        return response.data;
    }

    async calculateFee(params) {
        const response = await this.feeService.calculateFee(params);
        return response.data;
    }

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data.item;
    }

    async findPreviousGrants(params) {
        const response = await this.grantService.find(params);
        return response.data.item;
    }

}
export default GrantStore;
