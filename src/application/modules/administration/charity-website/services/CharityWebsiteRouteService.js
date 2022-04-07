import { BaseRouteService } from 'core/services';

class CharityWebsiteRouteService extends BaseRouteService {
    constructor() {
        super('third-party');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorId,charityIds,exceptIds,page,rpp,sort,embed,fields,type,isApiTesting}', filter);
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

export default CharityWebsiteRouteService;
