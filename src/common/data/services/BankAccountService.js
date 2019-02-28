import { BankAccountRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BankAccountService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BankAccountRouteService());
        this.apiClient = apiClient;
    }

    async updateCollection(resource) {
        const url = this.routeService.updateCollection();
        const response = await this.apiClient.put(url, resource);
        return response.data || null;
    }

    async createDonorAccountCollection(id, resource) {
        const url = this.routeService.createDonorAccountCollection(id);
        const response = await this.apiClient.post(url, resource);
        return response.data || null;
    }
}

export default BankAccountService;
