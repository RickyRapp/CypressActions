import { BaseService } from 'core/services';
import DonorInvestmentRouteService from './DonorInvestmentRouteService';

class DonorInvestmentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorInvestmentRouteService());
        this.apiClient = apiClient;
    }

    hasInvestments(id) {
        const url = this.routeService.hasInvestments(id);
        return this.apiClient.get(url);
    }

    invest(resource) {
        const url = this.routeService.invest();
        return this.apiClient.post(url, resource);
    }
}

export default DonorInvestmentService;
