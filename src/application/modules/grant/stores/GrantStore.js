import { CharityService } from 'application/charity/services';
import { DonorService } from 'application/donor/services';
import { GrantRequestService, GrantService, ScheduledGrantService } from 'application/grant/services';
import { FeeService } from 'common/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.grantService = moduleStore.rootStore.createApplicationService(GrantService);
        this.scheduledGrantService = moduleStore.rootStore.createApplicationService(ScheduledGrantService);
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.feeService = moduleStore.rootStore.createApplicationService(FeeService);
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.grantRequestService = moduleStore.rootStore.createApplicationService(GrantRequestService);
    }

    async create(resource) {
        const response = await this.grantService.create(resource);
        return response.data;
    }

    async createScheduledGrant(resource) {
        const response = await this.scheduledGrantService.create(resource);
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

    async suggest(resource) {
        const response = await this.charityService.suggest(resource);
        return response.data.response;
    }

    async getDonorInformation(id) {
        const response = await this.grantService.getDonorInformation(id);
        return response.data;
    }

    async getDonor(id, params) {
        const response = await this.donorService.get(id, params);
        return response.data;
    }

    async calculateFee(params) {
        const response = await this.feeService.calculateFee(params);
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

    async findGrants(params) {
        const response = await this.grantService.find(params);
        return response.data;
    }

    async getDetails(id, params) {
        const response = await this.grantService.get(id, params);
        return response.data;
    }

}
export default GrantStore;
