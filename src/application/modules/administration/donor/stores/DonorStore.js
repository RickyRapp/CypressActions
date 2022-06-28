import {
    DonorAddressService,
    DonorEmailAddressService,
    DonorPhoneNumberService,
    DonorService,
    DonorCommunicationPreferenceService,
    DonorBankAccountService,
    DonorGivingCardSettingService,
    DonorRecordActivityService
} from 'application/common/donor/services';
import { DonorFileStreamService } from 'common/services';

class DonorStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.donorAddressService = moduleStore.rootStore.createApplicationService(DonorAddressService);
        this.donorEmailAddressService = moduleStore.rootStore.createApplicationService(DonorEmailAddressService);
        this.donorPhoneNumberService = moduleStore.rootStore.createApplicationService(DonorPhoneNumberService);
        this.donorBankAccountService = moduleStore.rootStore.createApplicationService(DonorBankAccountService);
        this.donorCommunicationPreferenceService = moduleStore.rootStore.createApplicationService(DonorCommunicationPreferenceService);
        this.donorFileStreamService = moduleStore.rootStore.createApplicationService(DonorFileStreamService);
        this.donorGivingCardSettingService = moduleStore.rootStore.createApplicationService(DonorGivingCardSettingService);
        this.donorRecordActivityService = moduleStore.rootStore.createApplicationService(DonorRecordActivityService);
    }

    async findDonors(params) {
        const response = await this.donorService.find(params);
        return response.data;
    }

    async findDonorByUsernameOrAccNumber(params) {
        const response = await this.donorService.searchDonor(params);
        return response.data;
    }


    async findAddress(params) {
        const response = await this.donorAddressService.find(params);
        return response.data;
    }

    async findEmailAddress(params) {
        const response = await this.donorEmailAddressService.find(params);
        return response.data;
    }

    async findPhoneNumber(params) {
        const response = await this.donorPhoneNumberService.find(params);
        return response.data;
    }

    async findBankAccount(params) {
        const response = await this.donorBankAccountService.find(params);
        return response.data;
    }

    async findGivingCardSetting(params) {
        const response = await this.donorGivingCardSettingService.find(params);
        return response.data;
    }
    async getGivingCardSetting(params) {
        const response = await this.donorGivingCardSettingService.get(params);
        return response.data;
    }
    async searchAccountManager(params) {
        const response = await this.donorService.searchAccountManager(params);
        return response.data;
    }

    async searchDonor(params) {
        const response = await this.donorService.search(params);
        return response.data;
    }

    async getDonorLoginProfile(id) {
        const response = await this.donorService.getDonorLoginProfile(id);
        return response.data;
    }

    async getDonor(id, options) {
        const response = await this.donorService.getDonor(id, options);
        return response.data;
    }

    async getThirdPartyWebsiteSetting(id, options) {
        const response = await this.donorService.getThirdPartyWebsiteSetting(id, options);
        return response.data;
    }
    async getOnlineGrantSetting(id, options) {
        const response = await this.donorService.getOnlineGrantSetting(id, options);
        return response.data;
    }
    async getCertificateSetting(id, options) {
        const response = await this.donorService.getCertificateSetting(id, options);
        return response.data;
    }

    async getAutomaticContributionSetting(id, options) {
        const response = await this.donorService.getAutomaticContributionSetting(id, options);
        return response.data;
    }

    async getBankAccountAccountNumber(id) {
        const response = await this.donorBankAccountService.getBankAccountAccountNumber(id);
        return response.data;
    }

    async getCommunicationPreferences(id, options) {
        const response = await this.donorCommunicationPreferenceService.get(id, options);
        return response.data;
    }

    async getGivingCardSetting(id, options) {
        const response = await this.donorGivingCardSettingService.get(id, options);
        return response.data;
    }

    async fundNameExists(params) {
        const response = await this.donorService.fundNameExists(params);
        return response;
    }

    async phoneNumberExists(params) {
        const response = await this.donorService.phoneNumberExists(params);
        return response;
    }

    async createAccount(resource) {
        const response = await this.donorService.create(resource);
        return response.data;
    }

    async createAddress(resource) {
        const response = await this.donorAddressService.create(resource);
        return response.data;
    }

    async createEmailAddress(resource) {
        const response = await this.donorEmailAddressService.create(resource);
        return response.data;
    }

    async createPhoneNumber(resource) {
        const response = await this.donorPhoneNumberService.create(resource);
        return response.data;
    }

    async createBankAccount(resource) {
        const response = await this.donorBankAccountService.create(resource);
        return response.data;
    }

    async createAutomaticContributionSetting(resource) {
        const response = await this.donorService.createAutomaticContributionSetting(resource);
        return response.data;
    }

    async createGivingCardSetting(resource) {
        const response = await this.donorGivingCardSettingService.create(resource);
        return response.data;
    }

    async createGivingGoals(resource) {
        const response = await this.donorGivingCardSettingService.create(resource);
        return response.data;
    }

    async updateGrantFees(resource) {
        const response = await this.donorService.updateGrantFees(resource);
        return response.data;
    }

    async updateGeneralData(resource) {
        const response = await this.donorService.updateGeneralData(resource);
        return response.data;
    }

    async updateAccountSetting(resource) {
        const response = await this.donorService.updateAccountSetting(resource);
        return response.data;
    }

    async updateAddress(resource) {
        const response = await this.donorAddressService.update(resource);
        return response.data;
    }

    async updateEmailAddress(resource) {
        const response = await this.donorEmailAddressService.update(resource);
        return response.data;
    }

    async updatePhoneNumber(resource) {
        const response = await this.donorPhoneNumberService.update(resource);
        return response.data;
    }

    async updateThirdPartyWebsiteSetting(resource) {
        const response = await this.donorService.updateThirdPartyWebsiteSetting(resource);
        return response.data;
    }
    async updateOnlineGrantSetting(resource) {
        const response = await this.donorService.updateOnlineGrantSetting(resource);
        return response.data;
    }
    async updateCertificateSetting(resource) {
        const response = await this.donorService.updateCertificateSetting(resource);
        return response.data;
    }

    async updateCommunicationPreferences(resource) {
        const response = await this.donorCommunicationPreferenceService.update(resource);
        return response.data;
    }

    async updateBankAccount(resource) {
        const response = await this.donorBankAccountService.update(resource);
        return response.data;
    }

    async uploadDonorBankAccount(file, donorId, bankAccountId) {
        const response = await this.donorFileStreamService.uploadDonorBankAccount(file, donorId, bankAccountId);
        return response.data;
    }

    async updateGivingCardSetting(resource) {
        const response = await this.donorGivingCardSettingService.update(resource);
        return response.data;
    }

    async deleteGivingCardSetting(resource) {
        const response = await this.donorGivingCardSettingService.delete(resource);
        return response.data;
    }

    async unfreezeCard(resource) {
        const response = await this.donorGivingCardSettingService.unfreezeCard(resource);
        return response.data;
    }

    async deleteBankAccount(resource) {
        const response = await this.donorBankAccountService.delete(resource);
        return response.data;
    }

    async getRecordActivityList(params) {
        const response = await this.donorRecordActivityService.find(params);
        return response.data;
    }
}
export default DonorStore;
