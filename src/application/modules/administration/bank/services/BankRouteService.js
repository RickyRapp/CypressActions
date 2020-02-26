import { BaseRouteService } from 'core/services';

class BankRouteService extends BaseRouteService {
    constructor() {
        super('bank');
    }

    find(filter) {
        return super.find(this.base + '/{?searchQuery,page,rpp,sort,embed,fields}', filter);
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

export default BankRouteService;
