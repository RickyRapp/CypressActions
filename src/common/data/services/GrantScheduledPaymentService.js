import { GrantScheduledPaymentRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class GrantScheduledPaymentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantScheduledPaymentRouteService());
        this.apiClient = apiClient;
    }

    async cancel(id) {
        const url = this.routeService.cancel(id);
        const response = await this.apiClient.put(url, id);
        return response || null;
    }
}

export default GrantScheduledPaymentService;
