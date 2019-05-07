import { AddressRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class AddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new AddressRouteService());
        this.apiClient = apiClient;
    }

    async createAddress(route, userId, resource) {
        const url = this.routeService.createAddress(route, userId);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async markPrimary(route, id, addressId) {
        const url = this.routeService.markPrimary(route, id);
        const response = await this.apiClient.put(url, addressId);
        return response || null;
    }
}

export default AddressService;
