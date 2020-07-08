import { BaseRouteService } from 'core/services';

class DonorAccountInvestmentRouteService extends BaseRouteService {
    constructor() {
        super('donor-account-investment');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,page,rpp,sort,embed,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    findPoolHistory(filter) {
        return super.find(this.base + '/pool-history/{?id,page,rpp,sort,embed,searchFields}', filter);
    }

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    invest() {
        return super.create(this.base + '/invest');
    }
}

export default DonorAccountInvestmentRouteService;
