import { EmailAddressRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class EmailAddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EmailAddressRouteService());
        this.apiClient = apiClient;
    }

    async createEmailAddress(route, userId, resource) {
        const url = this.routeService.createEmailAddress(route, userId);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async markPrimary(route, id, emailAddressId) {
        const url = this.routeService.markPrimary(route, id);
        const response = await this.apiClient.put(url, emailAddressId);
        return response || null;
    }
}

export default EmailAddressService;
