import { BaseRouteService } from 'core/services';

class InvestmentRouteService extends BaseRouteService {
    constructor() {
        super('investment-pool-history');
    }

    find(filter) {
        return super.find(this.base + '/{?Id,investmentPoolIds,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    overview(filter) {
        return super.get(this.base + '/overview/{?Id,investmentPoolIds,page,rpp,sort,embed,fields}', filter);
    }

    invest() {
        return super.create(this.base + '/invest');
    }

    update() {
        return super.update(this.base);
    }
}

export default InvestmentRouteService;
