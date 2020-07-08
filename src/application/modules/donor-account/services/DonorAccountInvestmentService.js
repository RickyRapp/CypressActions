import { BaseService } from 'core/services';
import DonorAccountInvestmentRouteService from './DonorAccountInvestmentRouteService';

class DonorAccountInvestmentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorAccountInvestmentRouteService());
        this.apiClient = apiClient;
    }

    findPoolHistory(filter) {
        const url = this.routeService.findPoolHistory(filter);
        return this.apiClient.get(url);
    }

    invest(resource) {
        const url = this.routeService.invest();
        return this.apiClient.post(url, resource);
    }
}

export default DonorAccountInvestmentService;
