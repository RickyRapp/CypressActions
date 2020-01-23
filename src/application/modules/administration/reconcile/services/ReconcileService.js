import { BaseService } from 'core/services';
import ReconcileRouteService from './ReconcileRouteService';

class ReconcileService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ReconcileRouteService());
        this.apiClient = apiClient;
    }

    checkUpdate(resource) {
        const url = this.routeService.checkUpdate(resource);
        return this.apiClient.put(url, resource);
    }
}

export default ReconcileService;
