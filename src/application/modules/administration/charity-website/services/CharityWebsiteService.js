import { BaseService } from 'core/services';
import CharityWebsiteRouteService from './CharityWebsiteRouteService';

class CharityWebsiteService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityWebsiteRouteService());
        this.apiClient = apiClient;
    }
}

export default CharityWebsiteService;
