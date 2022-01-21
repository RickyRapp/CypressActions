import { DonationService, } from 'application/administration/donation/services';

class DonationStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
    }

    async findPendingDonation(params) {
        const response = await this.donationService.find(params);
        return response.data;
    }

    async achBatchCurrentNumber(resource) {
        const response = await this.donationService.achBatchCurrentNumber(resource);
        return response.data;
    }

    async reviewPendingDonations(resource) {
        const response = await this.donationService.reviewPendingDonations(resource);
        console.log("reviewPending ", response);
        return response.data;
    }
    async getPendingDonationsByCharityId(id) {
        const response = await this.donationService.getPendingDonationsByCharityId(id);
        return response.data;
    }
}
export default DonationStore;
