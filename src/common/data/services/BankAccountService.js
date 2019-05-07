import { BankAccountRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BankAccountService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BankAccountRouteService());
        this.apiClient = apiClient;
    }

    async createBankAccount(userId, resource) {
        const url = this.routeService.createBankAccount(userId);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }
}

export default BankAccountService;
