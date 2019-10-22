import { BaseService } from 'core/services';
import FeeRouteService from './FeeRouteService';

class FeeService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FeeRouteService());
        this.apiClient = apiClient;
    }

    async calculateFee(options) {
        const url = this.routeService.calculateFee(options);
        const response = await this.apiClient.get(url, options);
        return response.data || null;
    }
}

export default FeeService;
