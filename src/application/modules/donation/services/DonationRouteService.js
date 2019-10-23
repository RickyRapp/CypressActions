import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,search,name,taxId,donationId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }
}

export default DonationRouteService;
