import { GrantScheduledPaymentRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class GrantScheduledPaymentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantScheduledPaymentRouteService());
        this.apiClient = apiClient;
    }
}

export default GrantScheduledPaymentService;
