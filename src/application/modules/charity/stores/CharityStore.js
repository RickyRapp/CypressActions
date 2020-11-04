import { RoutingNumberService } from 'application/administration/bank/services';
import { CharityService, CharityBankAccountService } from 'application/charity/services';
import { CharityFileStreamService } from 'common/services';

class CharityStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.bankAccountService = moduleStore.rootStore.createApplicationService(CharityBankAccountService);
        this.routingNumberService = moduleStore.rootStore.createApplicationService(RoutingNumberService);
        this.fileStreamService = moduleStore.rootStore.createApplicationService(CharityFileStreamService);
    }

    async getCharity(id, options = {}) {
        const response = await this.charityService.get(id, options);
        return response.data;
    }

    async getCharityLoginProfile(id) {
        const response = await this.charityService.getCharityLoginProfile(id);
        return response.data;
    }

    async findCharity(params) {
        const response = await this.charityService.find(params);
        return response.data;
    }

    async createCharity(resource) {
        const response = await this.charityService.create(resource);
        return response.data;
    }

    async updateCharity(resource) {
        const response = await this.charityService.update(resource);
        return response.data;
    }

    async taxIdExists(resource) {
        const response = await this.charityService.taxIdExists(resource);
        return response.statusCode;
    }

    async getCharityBank(id, options = {}) {
        const response = await this.bankAccountService.get(id, options);
        return response.data;
    }

    async findRoutingNumber(params) {
        const response = await this.routingNumberService.find(params);
        return response.data;
    }

    async createBankAccount(resource) {
        const response = await this.bankAccountService.create(resource);
        return response.data;
    }

    async updateBankAccount(resource) {
        const response = await this.bankAccountService.update(resource);
        return response.data;
    }

    async findCharityBank(params) {
        const response = await this.bankAccountService.find(params);
        return response.data;
    }

    async deleteCharityBank(resource) {
        const response = await this.bankAccountService.delete(resource);
        return response.data;
    }

    async uploadBankAccount(file, charityId, bankAccountId) {
        const response = await this.fileStreamService.uploadCharityBankAccount(file, charityId, bankAccountId);
        return response.data;
    }


}
export default CharityStore;
