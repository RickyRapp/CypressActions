import { BaseService } from 'core/services';
import InvestmentRouteService from './InvestmentRouteService';

class InvestmentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new InvestmentRouteService());
        this.apiClient = apiClient;
    }

    overview(filter) {
        const url = this.routeService.overview(filter);
        return this.apiClient.get(url);
    }

    invest(resource) {
        const url = this.routeService.invest();
        return this.apiClient.post(url, resource);
    }
}

export default InvestmentService;
