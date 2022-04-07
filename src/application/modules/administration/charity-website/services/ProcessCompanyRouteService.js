import { BaseRouteService } from 'core/services';

class ProcessCompanyRouteService extends BaseRouteService {
    constructor() {
        super('giving-card-type');
    }

    find(filter) {
        return super.find(this.base + '/{?searchQuery,page,rpp,sort,embed,fields,isApiTesting}', filter);
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

export default ProcessCompanyRouteService;
