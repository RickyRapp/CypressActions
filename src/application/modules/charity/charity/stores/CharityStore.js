import { RoutingNumberService } from 'application/administration/bank/services';
import { 
    CharityService, 
    CharityBankAccountService, 
    CharityAddressService, 
    CharityCommunicationPreferenceService,
    WithdrawSettingsService
 } from 'application/common/charity/services';
import { DonationService } from 'application/donor/activity/services';
import { CharityFileStreamService } from 'common/services';

class CharityStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
        this.bankAccountService = moduleStore.rootStore.createApplicationService(CharityBankAccountService);
        this.charityAddressService = moduleStore.rootStore.createApplicationService(CharityAddressService);
        this.fileStreamService = moduleStore.rootStore.createApplicationService(CharityFileStreamService);
        this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
        this.routingNumberService = moduleStore.rootStore.createApplicationService(RoutingNumberService);
        this.charityCommunicationPreferenceService = moduleStore.rootStore.createApplicationService(CharityCommunicationPreferenceService);
        this.withdrawSettings = moduleStore.rootStore.createApplicationService(WithdrawSettingsService);
    }

    async findCharity(params) {
        const response = await this.charityService.find(params);
        return response.data;
    }

    async findCharityBank(params) {
        const response = await this.bankAccountService.find(params);
        return response.data;
    }

    async findCharityAddress(params) {
        const response = await this.charityAddressService.find(params);
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

    async getCharityBank(id, options) {
        const response = await this.bankAccountService.get(id, options);
        return response.data;
    }

    async getCharityAccountBalance(id){
        const response = await this.charityService.getCharityAccountBalance(id);
        return response.data;
    }

    async getCharityBankMedia(id){
        const response = await this.fileStreamService.getCharityBankMedia(id);
        return response.data;
    }

    async getCommunicationPreferences(id, options) {
        const response = await this.charityCommunicationPreferenceService.get(id, options);
        return response.data;
    }
    
    async getCharityMedia(charityId, mediaType) {
        const response = await this.fileStreamService.getCharityMedia(charityId, mediaType);
        return response.data;
    }

    async createCharity(resource) {
        const response = await this.charityService.create(resource);
        return response.data;
    }

    async createBankAccount(resource) {
        const response = await this.bankAccountService.create(resource);
        return response.data;
    }

    async createCharityAddress(resource) {
        const response = await this.charityAddressService.create(resource);
        return response.data;
    }

    async updateCharity(resource) {
        const response = await this.charityService.update(resource);
        return response.data;
    }

    async updateCharityAddress(resource) {
        const response = await this.charityAddressService.update(resource);
        return response.data;
    }

    async updateWithPlaidCharity(resource) {
        const response = await this.charityService.updateWithPlaid(resource);
        return response.data;
    }

    async updateBankAccount(resource) {
        const response = await this.bankAccountService.update(resource);
        return response.data;
    }

    async updateCommunicationPreferences(resource) {
        const response = await this.charityCommunicationPreferenceService.update(resource);
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

    async withdrawFundCharity(resource) {
        const response = await this.donationService.withdrawFundCharity(resource);
        return response.data;
    }

    async taxIdExists(resource) {
        const response = await this.charityService.taxIdExists(resource);
        return response.statusCode;
    }

    async findRoutingNumber(params) {
        const response = await this.routingNumberService.find(params);
        return response.data;
    }

    async updateAddress(params) {
        const response = await this.charityAddressService.update(params);
        return response.data;
    }

    async uploadMedia(file, charityId, mediaType) {
        const response = await this.fileStreamService.uploadCharityMedia(file, charityId, mediaType);
        return response.data;
    }   

    async updateGeneralData(resource) {
        const response = await this.charityService.updateGeneralData(resource);
        return response.data;
    }

    async getWithdrawSettings(partyId){ 
        const response = await this.withdrawSettings.getbyParty(partyId);
        return response.data;
    }

    async updateWithdrawSettings(resource){ 
        const response = await this.withdrawSettings.update(resource);
        return response.data;
    }

}
export default CharityStore;
