import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    find(filter) {
        return super.find(this.base + '/{?charityId,amountRangeMin,amountRangeMax,countRangeMin,countRangeMax,donationStatusIds,page,rpp,sort,embed,fields}', filter);
    }

    findOverview(filter) {
        return super.find(this.base + '/overview/{?charityId,search,donationStatusIds,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    review(resource) {
        return super.update(this.base + '/review', resource);
    }
}

export default DonationRouteService;
