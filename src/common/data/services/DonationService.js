import { DonationRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class DonationService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonationRouteService());
        this.apiClient = apiClient;
    }

    async review(resource) {
        const url = this.routeService.review(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default DonationService;
