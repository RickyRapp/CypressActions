import { BaseRouteService } from 'core/services';

class InvestmentPoolHistoryRouteService extends BaseRouteService {
    constructor() {
        super('investment-pool-history');
    }

    find(filter) {
        return super.find(this.base + '/{?investmentPoolIds,page,rpp,sort,embed,fields}', filter);
    }

    overview(filter) {
        return super.find(this.base + '/overview/{?page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    update() {
        return super.update(this.base);
    }
}

export default InvestmentPoolHistoryRouteService;
