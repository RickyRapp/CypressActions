import { RoutingNumberService } from 'application/administration/bank/services';
import { CharityService, CharityBankAccountService, CharityAddressService, CharityApiKeyService } from 'application/common/charity/services';
import { CharityFileStreamService } from 'common/services';

class CharityStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.bankAccountService = moduleStore.rootStore.createApplicationService(CharityBankAccountService);
        this.fileStreamService = moduleStore.rootStore.createApplicationService(CharityFileStreamService);
        this.charityAddressService = moduleStore.rootStore.createApplicationService(CharityAddressService);
        this.routingNumberService = moduleStore.rootStore.createApplicationService(RoutingNumberService);
        this.charityApiKeyService = moduleStore.rootStore.createApplicationService(CharityApiKeyService);
    }

    async findCharityBank(params) {
        const response = await this.bankAccountService.find(params);
        return response.data;
    }

    async findCharity(params) {
        const response = await this.charityService.find(params);
        return response.data;
    }
    async findPendingCharity(params) {
        const response = await this.charityService.findPending(params);
        return response.data;
    }
    
    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

    async findAddress(params) {
        const response = await this.charityAddressService.find(params);
        return response.data;
    }

    async findRoutingNumber(params) {
        const response = await this.routingNumberService.find(params);
        return response.data;
    }

    async getCharity(id, options = {}) {
        const response = await this.charityService.get(id, options);
        return response.data;
    }

    async getCharityLoginProfile(id) {
        const response = await this.charityService.getCharityLoginProfile(id);
        return response.data;
    }
    async getCharityBank(id, options = {}) {
        const response = await this.bankAccountService.get(id, options);
        return response.data;
    }

    async taxIdExists(resource) {
        const response = await this.charityService.taxIdExists(resource);
        return response.statusCode;
    }

    async createCharity(resource) {
        const response = await this.charityService.create(resource);
        return response.data;
    }

    async createAddress(params) {
        const response = await this.charityAddressService.create(params);
        return response.data;
    }

    async updateCharity(resource) {
        const response = await this.charityService.update(resource);
        return response.data;
    }

    async approveCharity(resource) {
        const response = await this.charityService.approve(resource);
        return response.data;
    }

    async updateAddress(params) {
        const response = await this.charityAddressService.update(params);
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

    async regenerateCharityApiKey(charityId){
        const response = await this.charityApiKeyService.update(charityId);
        return response.data;
    }

    async uploadBankAccount(file, charityId, bankAccountId) {
        const response = await this.fileStreamService.uploadCharityBankAccount(file, charityId, bankAccountId);
        return response.data;
    }

    async deleteCharityBank(resource) {
        const response = await this.bankAccountService.delete(resource);
        return response.data;
    }
}
export default CharityStore;
