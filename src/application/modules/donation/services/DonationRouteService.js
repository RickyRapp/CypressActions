import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    findSummaryPastGrants(params) {
        return super.find(this.base + '/summary/{?donorId,charityId,donationStatusIds,donationTypeIds,embed,fields}', params);
    }

    findPendingDonation(params) {
        return super.find(this.base + '/overview/{?embed,fields}', params);
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
}

export default DonationRouteService;
