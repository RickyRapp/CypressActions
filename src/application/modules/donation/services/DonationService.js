import { BaseService } from 'core/services';
import DonationRouteService from './DonationRouteService';

class DonationService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonationRouteService());
        this.apiClient = apiClient;
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    findOverview(filter) {
        const url = this.routeService.findOverview(filter);
        return this.apiClient.get(url);
    }
}

export default DonationService;
