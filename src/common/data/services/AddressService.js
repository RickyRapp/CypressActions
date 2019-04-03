import { AddressRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class AddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new AddressRouteService());
        this.apiClient = apiClient;
    }

    async updateDonorAccountAddresses(resource) {
        const url = this.routeService.updateDonorAccountAddresses(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }

    async createDonorAccountCollection(id, resource) {
        const url = this.routeService.createDonorAccountCollection(id);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async getDonorAccountCollection(id, options = {}) {
        const url = this.routeService.getDonorAccountCollection(id, options);
        const response = await this.apiClient.get(url);
        return response.data || null;
    }
}

export default AddressService;
