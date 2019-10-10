import { BaseService } from 'core/services';
import CharityRouteService from './CharityRouteService';

class CharityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityRouteService());
        this.apiClient = apiClient;
    }

    async search(filter) {
        const url = this.routeService.search(filter);
        const response = await this.apiClient.get(url, filter);
        return response.data || null;
    }

    async findDonorPendingTransactions(donorAccountId) {
        const url = this.routeService.findDonorPendingTransactions(donorAccountId);
        const response = await this.apiClient.get(url);
        return response || null;
    }
}

export default CharityService;
