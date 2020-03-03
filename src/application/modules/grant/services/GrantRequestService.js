import { BaseService } from 'core/services';
import GrantRequestRouteService from './GrantRequestRouteService';

class GrantRequestService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRequestRouteService());
        this.apiClient = apiClient;
    }

    createSetting(resource) {
        const url = this.routeService.createSetting();
        return this.apiClient.post(url, resource);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    findCharityGrantRequest(filter) {
        const url = this.routeService.findCharityGrantRequest(filter);
        return this.apiClient.get(url);
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

export default GrantRequestService;
