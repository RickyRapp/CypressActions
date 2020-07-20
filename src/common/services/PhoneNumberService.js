import { BaseService } from 'core/services';
import PhoneNumberRouteService from './PhoneNumberRouteService';

class PhoneNumberService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new PhoneNumberRouteService());
        this.apiClient = apiClient;
    }

    createDonorPhoneNumber(resource) {
        const url = this.routeService.createDonorPhoneNumber(resource);
        return this.apiClient.post(url, resource);
    }

    markPrimary(resource) {
        const url = this.routeService.markPrimary(resource);
        return this.apiClient.put(url, resource);
    }
}

export default PhoneNumberService;
