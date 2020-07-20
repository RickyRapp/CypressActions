import { BaseRouteService } from 'core/services';

class ThirdPartyWebsiteRouteService extends BaseRouteService {
    constructor() {
        super('third-party-website');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorId,charityIds,exceptIds,page,rpp,sort,embed,fields}', filter);
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

export default ThirdPartyWebsiteRouteService;
