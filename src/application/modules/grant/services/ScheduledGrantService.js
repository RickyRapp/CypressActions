import { BaseService } from 'core/services';
import ScheduledGrantRouteService from './ScheduledGrantRouteService';

class ScheduledGrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ScheduledGrantRouteService());
        this.apiClient = apiClient;
    }

    async cancel(resource) {
        const url = this.routeService.cancel(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default ScheduledGrantService;
