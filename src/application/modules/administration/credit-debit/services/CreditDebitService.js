import { BaseService } from 'core/services';
import CreditDebitRouteService from './CreditDebitRouteService';

class CreditDebitService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CreditDebitRouteService());
        this.apiClient = apiClient;
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }
}

export default CreditDebitService;
