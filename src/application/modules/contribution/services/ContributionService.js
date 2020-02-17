import { BaseService } from 'core/services';
import ContributionRouteService from './ContributionRouteService';

class ContributionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ContributionRouteService());
        this.apiClient = apiClient;
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }
}

export default ContributionService;
