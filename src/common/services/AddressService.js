import { BaseService } from 'core/services';
import AddressRouteService from './AddressRouteService';

class AddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new AddressRouteService());
        this.apiClient = apiClient;
    }

    createDonorAccountAddress(resource) {
        const url = this.routeService.createDonorAccountAddress(resource);
        return this.apiClient.post(url, resource);
    }

    markPrimary(resource) {
        const url = this.routeService.markPrimary(resource);
        return this.apiClient.put(url, resource);
    }
}

export default AddressService;
