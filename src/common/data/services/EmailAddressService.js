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

    async createDonorAccountCollection(id, resource) {
        const url = this.routeService.createDonorAccountCollection(id);
        const response = await this.apiClient.post(url, resource);
        return response.data || null;
    }

    async getDonorAccountCollection(id, options = {}) {
        const url = this.routeService.getDonorAccountCollection(id, options);
        const response = await this.apiClient.get(url);
        return response.data || null;
    }
}

export default EmailAddressService;
