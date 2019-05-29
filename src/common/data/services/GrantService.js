import { GrantRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class GrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRouteService());
        this.apiClient = apiClient;
    }

    async review(resource) {
        const url = this.routeService.review(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default GrantService;
