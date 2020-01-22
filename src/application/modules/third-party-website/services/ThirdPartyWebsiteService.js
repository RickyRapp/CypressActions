import { BaseService } from 'core/services';
import ThirdPartyWebsiteRouteService from './ThirdPartyWebsiteRouteService';

class ThirdPartyWebsiteService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ThirdPartyWebsiteRouteService());
        this.apiClient = apiClient;
    }
}

export default ThirdPartyWebsiteService;
