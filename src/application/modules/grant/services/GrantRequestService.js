import { BaseService } from 'core/services';
import GrantRequestRouteService from './GrantRequestRouteService';

class GrantRequestService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRequestRouteService());
        this.apiClient = apiClient;
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    findCharityGrantRequest(filter) {
        const url = this.routeService.findCharityGrantRequest(filter);
        return this.apiClient.get(url);
    }

    complete(resource) {
        const url = this.routeService.complete(resource);
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

export default GrantRequestService;
