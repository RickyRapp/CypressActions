import { BaseService } from 'core/services';
import InvestmentPoolHistoryRouteService from './InvestmentPoolHistoryRouteService';

class InvestmentPoolHistoryService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new InvestmentPoolHistoryRouteService());
        this.apiClient = apiClient;
    }

    overview(filter) {
        const url = this.routeService.overview(filter);
        return this.apiClient.get(url);
    }
}

export default InvestmentPoolHistoryService;
