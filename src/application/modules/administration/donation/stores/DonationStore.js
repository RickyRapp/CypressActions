import { DonationService, } from 'application/administration/donation/services';

class DonationStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
    }

    async findPendingDonation(params) {
        //TODO move sorting to server
        const response = await this.donationService.find(params);
        return response.data;
    }

    async achBatchCurrentNumber(resource) {
        const response = await this.donationService.achBatchCurrentNumber(resource);
        return response.data;
    }

    async reviewPendingDonations(resource) {
        const response = await this.donationService.reviewPendingDonations(resource);
        return response.data;
    }
    async getPendingDonationsByCharityId(id, address) {
        const response = await this.donationService.getPendingDonationsByCharityId(id, address);
        return response.data;
    }

    async getDonationReviewLogs() {
        const response = await this.donationService.getDonationReviewLogs();
        return response.data;
    }
}
export default DonationStore;
