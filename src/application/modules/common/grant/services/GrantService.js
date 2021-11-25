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

    isEligibleForEdit(id) {
        const url = this.routeService.isEligibleForEdit(id);
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

    approve(resource) {
        const url = this.routeService.approve(resource);
        return this.apiClient.put(url, resource);
    }

    decline(resource) {
        const url = this.routeService.decline(resource);
        return this.apiClient.put(url, resource);
    }

    cancel(resource) {
        const url = this.routeService.cancel(resource);
        return this.apiClient.put(url, resource);
    }
}

export default GrantService;
