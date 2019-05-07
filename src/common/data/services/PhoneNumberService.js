import { PhoneNumberRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class PhoneNumberService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new PhoneNumberRouteService());
        this.apiClient = apiClient;
    }

    async createPhoneNumber(route, userId, resource) {
        const url = this.routeService.createPhoneNumber(route, userId);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async markPrimary(route, id, phoneNumberId) {
        const url = this.routeService.markPrimary(route, id);
        const response = await this.apiClient.put(url, phoneNumberId);
        return response || null;
    }
}

export default PhoneNumberService;
