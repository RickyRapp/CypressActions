import { BaseRouteService } from 'core/services';

class FeeRouteService extends BaseRouteService {
    constructor() {
        super('fee');
    }

    calculateFee(options) {
        return super.find(this.base + '/calculate-fee/{?id,feeTypeId,amount}', options);
    }
}

export default FeeRouteService;
