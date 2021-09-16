import { BaseRouteService } from 'core/services';

class DonorInvestmentRouteService extends BaseRouteService {
    constructor() {
        super('donor-investment');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,investmentPoolIds,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    hasInvestments(id) {
        return super.get(this.base + '/has-investments/{id}', id);
    }

    invest() {
        return super.create(this.base + '/invest');
    }

    update() {
        return super.update(this.base);
    }
}

export default DonorInvestmentRouteService;
