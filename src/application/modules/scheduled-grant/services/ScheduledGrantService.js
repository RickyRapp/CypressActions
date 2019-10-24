import { BaseService } from 'core/services';
import ScheduledGrantRouteService from './ScheduledGrantRouteService';

class ScheduledGrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ScheduledGrantRouteService());
        this.apiClient = apiClient;
    }
}

export default ScheduledGrantService;
