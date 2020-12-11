import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    find(params) {
        return super.find(this.base + '/{?embed,fields}', params);
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
}

export default DonationRouteService;
