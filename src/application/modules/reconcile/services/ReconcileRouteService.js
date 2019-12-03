import { BaseRouteService } from 'core/services';

class ReconcileRouteService extends BaseRouteService {
    constructor() {
        super('reconcile');
    }

    find(filter) {
        return super.find(this.base + '/{?page,rpp,sort,embed,fields}', filter);
    }

    checkUpdate(resource) {
        return super.update(this.base + '/check/{id}', resource);
    }
}

export default ReconcileRouteService;
