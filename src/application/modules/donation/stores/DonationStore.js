import { DonationService, } from 'application/donation/services';

class DonationStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
    }

    async findPendingDonation(params) {
        const response = await this.donationService.findPendingDonation(params);
        return response.data;
    }
}
export default DonationStore;
