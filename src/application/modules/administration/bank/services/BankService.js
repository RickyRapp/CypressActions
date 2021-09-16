import { BaseService } from 'core/services';
import BankRouteService from './BankRouteService';

class BankService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BankRouteService());
        this.apiClient = apiClient;
    }
}

export default BankService;
