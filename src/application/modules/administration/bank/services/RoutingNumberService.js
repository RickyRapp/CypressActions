import { BaseService } from 'core/services';
import RoutingNumberRouteService from './RoutingNumberRouteService';

class RoutingNumberService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new RoutingNumberRouteService());
        this.apiClient = apiClient;
    }
}

export default RoutingNumberService;
