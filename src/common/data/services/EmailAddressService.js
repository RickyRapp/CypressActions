import { EmailAddressRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class EmailAddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EmailAddressRouteService());
        this.apiClient = apiClient;
    }

    async updateDonorAccountEmailAddresses(resource) {
        const url = this.routeService.updateDonorAccountEmailAddresses(resource);
        const response = await this.apiClient.put(url, resource);
        return response.data || null;
    }

    async updateCollection(id, resource) {
        const url = this.routeService.updateCollection(id);
        const response = await this.apiClient.put(url, resource);
        return response.data || null;
    }

    async createCollection(id, resource) {
        const url = this.routeService.createCollection(id);
        const response = await this.apiClient.post(url, resource);
        return response.data || null;
    }
}

export default EmailAddressService;
