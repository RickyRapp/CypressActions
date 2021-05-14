import { BaseRouteService } from 'core/services';

class ReconcileRouteService extends BaseRouteService {
    constructor() {
        super('reconcile');
    }

    find(filter) {
        return super.find(this.base + '/{?search,paymentTypeIds,page,rpp,sort,embed,fields}', filter);
    }

    checkUpdate(resource) {
        return super.update(this.base + '/check/{id}', resource);
    }

    generateReport(resource) {
        return super.update(this.base + '/generate-report', resource);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }
}

export default ReconcileRouteService;
