import { BaseRouteService } from 'core/services';

class DonorInvestmentRouteService extends BaseRouteService {
    constructor() {
        super('donor-investment');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,page,rpp,sort,embed,searchFields}', filter);
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

export default DonorInvestmentRouteService;
