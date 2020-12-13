import { BaseService } from 'core/services';
import CharityRouteService from './CharityRouteService';

class CharityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityRouteService());
        this.apiClient = apiClient;
    }

    suggest(resource) {
        const url = this.routeService.suggest();
        return this.apiClient.post(url, resource);
    }

    search(filter) {
        const url = this.routeService.search(filter);
        return this.apiClient.get(url);
    }

    taxIdExists(taxId) {
        const url = this.routeService.taxIdExists(taxId);
        return this.apiClient.get(url);
    }
}

export default CharityService;
