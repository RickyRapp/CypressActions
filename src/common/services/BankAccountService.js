import { BaseService } from 'core/services';
import BankAccountRouteService from './BankAccountRouteService';

class BankAccountService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BankAccountRouteService());
        this.apiClient = apiClient;
    }

    createDonorBankAccount(resource) {
        const url = this.routeService.createDonorBankAccount(resource);
        return this.apiClient.post(url, resource);
    }
}

export default BankAccountService;
