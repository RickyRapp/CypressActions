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

    getDonatonReviews() {
        return super.get(this.base + '/donation-review-log', null, null);
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
    
    getPendingDonationsByCharityId(id, address1, isWithdraw) {
        return super.get(this.base + '/pending-donations/{id}?address1=' +  encodeURIComponent(address1) + '&isWithdraw='+ isWithdraw, id);
    }

    getCwtUsingDonationReviewLog(id){
        return super.get(this.base + '/donation-review-log/{id}', id, null);
    }
}

export default DonationRouteService;
