import { GrantRequestService } from 'application/common/grant/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
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
}
export default GrantStore;
