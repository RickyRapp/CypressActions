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

export default AddressService;
