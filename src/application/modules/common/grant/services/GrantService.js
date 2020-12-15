import { BaseService } from 'core/services';
import GrantRouteService from './GrantRouteService';

class GrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRouteService());
        this.apiClient = apiClient;
    }

    findSummaryPastGrant(params) {
        const url = this.routeService.findSummaryPastGrant(params);
        return this.apiClient.get(url);
    }

    findPastGrant(params) {
        const url = this.routeService.findPastGrant(params);
        return this.apiClient.get(url);
    }

    getDetails(id, params) {
        const url = this.routeService.getDetails(id, params);
        return this.apiClient.get(url);
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }

    createSetting(resource) {
        const url = this.routeService.createSetting();
        return this.apiClient.post(url, resource);
    }

    createCharityGivingCard(resource) {
        const url = this.routeService.createCharityGivingCard(resource);
        return this.apiClient.post(url, resource);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }
}

export default GrantService;
