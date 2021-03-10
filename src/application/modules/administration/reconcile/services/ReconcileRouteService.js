import { BaseRouteService } from 'core/services';

class ReconcileRouteService extends BaseRouteService {
    constructor() {
        super('reconcile');
    }

    find(filter) {
        return super.find(this.base + '/{?search,page,rpp,sort,embed,fields}', filter);
    }

    checkUpdate(resource) {
        return super.update(this.base + '/check/{id}', resource);
    }

    generateReport(resource) {
        return super.update(this.base + '/generate-report', resource);
    }
}

export default ReconcileRouteService;
