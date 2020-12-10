import { BaseService } from 'core/services';
import GrantRouteService from './GrantRouteService';

class GrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRouteService());
        this.apiClient = apiClient;
    }

    createSetting(resource) {
        const url = this.routeService.createSetting();
        return this.apiClient.post(url, resource);
    }

    getDetails(id, params) {
        const url = this.routeService.getDetails(id, params);
        return this.apiClient.get(url);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }

    findSummaryPastGrants(params) {
        const url = this.routeService.findSummaryPastGrants(params);
        return this.apiClient.get(url);
    }

    findPastGrant(params) {
        const url = this.routeService.findPastGrant(params);
        return this.apiClient.get(url);
    }
}

export default GrantService;
