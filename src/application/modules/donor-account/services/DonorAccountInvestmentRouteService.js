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

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }
}

export default DonorAccountInvestmentRouteService;
