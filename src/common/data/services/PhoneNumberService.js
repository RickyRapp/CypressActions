import { PhoneNumberRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class PhoneNumberService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new PhoneNumberRouteService());
        this.apiClient = apiClient;
    }

    async updateDonorAccountPhoneNumbers(resource) {
        const url = this.routeService.updateDonorAccountPhoneNumbers(resource);
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

export default PhoneNumberService;
