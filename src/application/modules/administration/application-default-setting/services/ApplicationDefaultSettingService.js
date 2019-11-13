import { BaseService } from 'core/services';
import ApplicationDefaultSettingRouteService from './ApplicationDefaultSettingRouteService';

class ApplicationDefaultSettingService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ApplicationDefaultSettingRouteService());
        this.apiClient = apiClient;
    }
}

export default ApplicationDefaultSettingService;
