import LookupRouteService from './LookupRouteService';
import { BaseService } from 'core/services';

class LookupService extends BaseService {
    constructor(apiClient, lookupRouteName) {
        if (lookupRouteName && lookupRouteName.length > 1 && lookupRouteName.slice(-1) !== '/') {
            lookupRouteName = lookupRouteName + '/';
        }
        super(apiClient, new LookupRouteService(lookupRouteName));
    }

    getAll() {
        const url = this.routeService.getAll();
        return this.apiClient.get(url);
    }
}

export default LookupService;
