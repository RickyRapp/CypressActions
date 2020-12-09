import { CharityService } from 'application/charity/services';
import { DonorService } from 'application/donor/services';
import { GrantRequestService, GrantService, ScheduledGrantService } from 'application/grant/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.scheduledGrantService = moduleStore.rootStore.createApplicationService(ScheduledGrantService);
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
    }

    async findGrants(params) {
        const response = await this.grantService.find(params);
        return response.data;
    }

    async findScheduledGrant(params) {
        const response = await this.scheduledGrantService.find(params);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.grantService.getDonorInformation(id);
        return response.data;
    }

    async getDonor(id, params) {
        const response = await this.donorService.get(id, params);
        return response.data;
    }

    async getDetails(id, params) {
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

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

    async searchDonor(params) {
        const response = await this.donorService.search(params);
        return response.data.item;
    }

    async create(resource) {
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

    async createRequest(resource) {
        const response = await this.grantRequestService.create(resource);
        return response.data;
    }

    async update(resource) {
        const response = await this.grantService.update(resource);
        return response.data;
    }

    async updateScheduledGrant(resource) {
        const response = await this.scheduledGrantService.update(resource);
        return response.data;
    }

    async suggest(resource) {
        const response = await this.charityService.suggest(resource);
        return response.data.response;
    }

    async cancelScheduledGrant(resource) {
        const response = await this.scheduledGrantService.cancel(resource);
        return response.data;
    }
}
export default GrantStore;
