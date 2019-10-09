import { BaseService } from 'core/services';
import EmailAddressRouteService from './EmailAddressRouteService';

class EmailAddressService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EmailAddressRouteService());
        this.apiClient = apiClient;
    }

    createDonorAccountEmailAddress(resource) {
        const url = this.routeService.createDonorAccountEmailAddress(resource);
        return this.apiClient.post(url, resource);
    }

    markPrimary(resource) {
        const url = this.routeService.markPrimary(resource);
        return this.apiClient.put(url, resource);
    }
}

export default EmailAddressService;
