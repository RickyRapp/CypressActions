import { DonationService, } from 'application/administration/donation/services';

class DonationStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donationService = moduleStore.rootStore.createApplicationService(DonationService);
    }

    async findPendingDonation(params) {
        const response = await this.donationService.find(params);
        if (params.paymentType.abrv === 'ach') {
            var data = [];
            for (let index = 0; index < response.data.length; index++) {
                const element = response.data[index];
                if (element.isACHAvailable) {
                    data.push(element);
                }
            }
            //var data = await response.data.filter(p => p.isACHAvailable);
            console.log("findPendingDonations filtered ", data);
            return data;
        }
        else {
            console.log("findPendingDonations ", response);
            return response.data;
        }
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
    async getPendingDonationsByCharityId(id, address) {
        const response = await this.donationService.getPendingDonationsByCharityId(id, address);
        return response.data;
    }
}
export default DonationStore;
