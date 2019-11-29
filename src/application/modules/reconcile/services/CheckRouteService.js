import { BaseRouteService } from 'core/services';

class CheckRouteService extends BaseRouteService {
    constructor() {
        super('reconcile');
    }

    find(filter) {
        return super.find(this.base + '/{?page,rpp,sort,embed,fields}', filter);
    }
}

export default CheckRouteService;
