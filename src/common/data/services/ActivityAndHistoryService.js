import { ActivityAndHistoryRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class ActivityAndHistoryService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ActivityAndHistoryRouteService());
        this.apiClient = apiClient;
    }
}

export default ActivityAndHistoryService;
