import { BaseService } from 'core/services';
import ScheduledSettingRouteService from './ScheduledSettingRouteService';

class ScheduledSettingService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ScheduledSettingRouteService());
        this.apiClient = apiClient;
    }

    async runTask(name) {
        const url = this.routeService.run(name);
        const response = await this.apiClient.put(url);
        return response || null;
    }
}

export default ScheduledSettingService;
