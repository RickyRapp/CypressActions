import { BaseService } from 'core/services';
import FeeRouteService from './FeeRouteService';

class FeeService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FeeRouteService());
        this.apiClient = apiClient;
    }

    calculateFee(options) {
        const url = this.routeService.calculateFee(options);
        return this.apiClient.get(url, options);
    }
}

export default FeeService;
