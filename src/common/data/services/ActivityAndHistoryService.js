import { ActivityAndHistoryRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class ActivityAndHistoryService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ActivityAndHistoryRouteService());
        this.apiClient = apiClient;
    }

    async findDonorPendingTransactions(donorAccountId) {
        const url = this.routeService.findDonorPendingTransactions(donorAccountId);
        const response = await this.apiClient.get(url);
        return response.data || null;
    }
}

export default ActivityAndHistoryService;
