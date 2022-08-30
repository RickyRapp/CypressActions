import { GrantRequestService, GrantService, ScheduledGrantService } from 'application/common/grant/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.grantScheduledPaymentService = moduleStore.rootStore.createApplicationService(ScheduledGrantService);
    }

    async findGrantRequest(params) {
        const response = await this.grantRequestService.find(params);
        return response.data;
    }

    async getGrantRequest(id, params) {
        const response = await this.grantRequestService.get(id, params);
        return response.data;
    }

    async getDonorFromCard(resource) {
        const response = await this.grantService.getDonorFromCard(resource);
        return response.data;
    }

    async createGrantRequest(resource) {
        const response = await this.grantRequestService.create(resource);
        return response.data;
    }

    async createWithdraw(resource){
        const response = await this.grantService.createWithdraw(resource);
        return response.data;
    }

    async createGrantGivingCard(resource) {
        const response = await this.grantService.createCharityGivingCard(resource);
        return response.data;
    }

    async createScheduledGrant(resource) {
        const response = await this.grantScheduledPaymentService.create(resource);
        return response.data;
    }
}
export default GrantStore;
