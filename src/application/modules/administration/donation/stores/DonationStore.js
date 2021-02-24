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

    async reviewPendingDonations(resource) {
        debugger
        const response = await this.donationService.reviewPendingDonations(resource);
        return response.data;
    }
}
export default DonationStore;
