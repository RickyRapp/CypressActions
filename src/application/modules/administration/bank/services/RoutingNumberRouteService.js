import { BaseRouteService } from 'core/services';

class RoutingNumberRouteService extends BaseRouteService {
    constructor() {
        super('routing-number');
    }

    find(filter) {
        return super.find(this.base + '/{?search,bankId,number,page,rpp,sort,embed,fields}', filter);
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

    delete(resource) {
        return super.create(this.base + '/{id}', resource);
    }
}

export default RoutingNumberRouteService;
