import { BaseService } from 'core/services';
import ContributionSettingRouteService from './ContributionSettingRouteService';

class ContributionSettingService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ContributionSettingRouteService());
        this.apiClient = apiClient;
    }

    async cancel(resource) {
        const url = this.routeService.cancel(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default ContributionSettingService;
