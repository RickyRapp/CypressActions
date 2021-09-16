import { GrantRequestService, GrantService } from 'application/common/grant/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
    }

    async findGrantRequest(params) {
        const response = await this.grantRequestService.find(params);
        return response.data;
    }

    async getGrantRequest(id, params) {
        const response = await this.grantRequestService.get(id, params);
        return response.data;
    }

    async createGrantRequest(resource) {
        const response = await this.grantRequestService.create(resource);
        return response.data;
    }

    async createGrantGivingCard(resource) {
        const response = await this.grantService.createCharityGivingCard(resource);
        return response.data;
    }
}
export default GrantStore;
