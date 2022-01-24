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
    
    getPendingDonationsByCharityId(id, address1) {
        return super.get(this.base + '/pending-donations/{id}?address1=' +  address1, id);
    }
}

export default DonationRouteService;
