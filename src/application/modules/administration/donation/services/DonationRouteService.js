import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
    constructor() {
        super('donation');
    }

    find(params) {
        return super.find(this.base + '/{?embed,fields,paymentType}', params);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    achBatchCurrentNumber({ increment }) {
        return this.base + `/current-ach-batch-number?increment=${increment}`;
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
