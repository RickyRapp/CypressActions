import { GrantService, GrantRequestService, ScheduledGrantService } from 'application/common/grant/services';
import { CharityService } from 'application/common/charity/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
        this.scheduledGrantService = moduleStore.rootStore.createApplicationService(ScheduledGrantService);
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
    }

    async findGrant(params) {
        const response = await this.grantService.find(params);
        return response.data;
    }

    async findPastGrant(params) {
        const response = await this.grantService.findPastGrant(params);
        return response.data;
    }

    async findSummaryPastGrant(params) {
        const response = await this.grantService.findSummaryPastGrants(params);
        return response.data;
    }

    async findScheduledGrant(params) {
        const response = await this.scheduledGrantService.find(params);
        return response.data;
    }

    async findGrantRequest(params) {
        const response = await this.grantRequestService.find(params);
        return response.data;
    }

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

    async getGrant(id, params) {
        const response = await this.grantService.get(id, params);
        return response.data;
    }

    async getScheduledGrant(id, params) {
        const response = await this.scheduledGrantService.get(id, params);
        return response.data;
    }

    async getGrantRequest(id, params) {
        const response = await this.grantRequestService.get(id, params);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.grantService.getDonorInformation(id);
        return response.data;
    }

    async isEligibleForEdit(id) {
        const response = await this.grantService.isEligibleForEdit(id);
        return response.data;
    }

    async createGrant(resource) {
        const response = await this.grantService.create(resource);
        return response.data;
    }

    async createScheduledGrant(resource) {
        const response = await this.scheduledGrantService.create(resource);
        return response.data;
    }

    async createGrantRequest(resource) {
        const response = await this.grantRequestService.createGrant(resource);
        return response.data;
    }

    async suggest(resource) {
        const response = await this.charityService.suggest(resource);
        return response.data.response;
    }

    async updateGrant(resource) {
        const response = await this.grantService.update(resource);
        return response.data;
    }

    async approveGrant(resource) {
        const response = await this.grantService.approve(resource);
        return response.data;
    }

    async declineGrant(resource) {
        const response = await this.grantService.decline(resource);
        return response.data;
    }

    async cancelGrant(resource) {
        const response = await this.grantService.cancel(resource);
        return response.data;
    }

    async updateScheduledGrant(resource) {
        const response = await this.scheduledGrantService.update(resource);
        return response.data;
    }

    async cancelScheduledGrant(resource) {
        const response = await this.scheduledGrantService.cancel(resource);
        return response.data;
    }

    async getSimilarByCharityType(params){
        const response = await this.grantService.getSimilarByCharityType(params);
        return response.data;
    }
}
export default GrantStore;
