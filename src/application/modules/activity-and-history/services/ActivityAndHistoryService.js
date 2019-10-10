import { BaseService } from 'core/services';
import ActivityAndHistoryRouteService from './ActivityAndHistoryRouteService';

class ActivityAndHistoryService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ActivityAndHistoryRouteService());
        this.apiClient = apiClient;
    }

    async findDonorPendingTransactions(donorAccountId) {
        const url = this.routeService.findDonorPendingTransactions(donorAccountId);
        const response = await this.apiClient.get(url);
        return response || null;
    }
}

export default ActivityAndHistoryService;
