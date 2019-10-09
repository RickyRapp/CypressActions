import { BaseRouteService } from 'core/services';

class LookupRouteService extends BaseRouteService {
    constructor(lookupRouteName) {
        super(lookupRouteName);
    }

    getAll() {
        return super.get(this.base + 'get-all');
    }
}

export default LookupRouteService;
