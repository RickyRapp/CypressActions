import { BaseService } from 'core/services';
import ContributionRouteService from './ContributionRouteService';

class ContributionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ContributionRouteService());
        this.apiClient = apiClient;
    }

    getDetails(id, params) {
        const url = this.routeService.getDetails(id, params);
        return this.apiClient.get(url);
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }
}

export default ContributionService;
