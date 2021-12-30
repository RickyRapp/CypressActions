import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    findPendingDonation(params) {
        return super.find(this.base + '/overview/{?embed,fields}', params);
    }

    findSummaryPastGrant(params) {
        return super.find(this.base + '/summary/{?donorId,charityId,donationStatusIds,donationTypeIds,embed,fields}', params);
    }

    findPastGrant(params) {
        return super.find(this.base + '/donor/{?donorId,charityId,donationStatusIds,donationTypeIds,embed,fields}', params);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    review(resource) {
        return super.update(this.base + '/review', resource);
    }

    withdrawFundCharity(resource) {
        return super.update(this.base + '/withdraw-funds/{id}', resource);
    }

    getPendingDonationsByCharityId(id) {
        return super.get(this.base + '/pending-donations/{id}', id);
    }
}

export default DonationRouteService;
