import { BaseService } from 'core/services';
import ActivityRouteService from './ActivityRouteService';

class ActivityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ActivityRouteService());
        this.apiClient = apiClient;
    }

    findCharityTransactions(filter) {
        const url = this.routeService.findCharityTransactions(filter);
        return this.apiClient.get(url);
    }
    findPendingCheck(filter) {
        const url = this.routeService.findPendingCheck(filter);
        return this.apiClient.get(url);
    }
}

export default ActivityService;
