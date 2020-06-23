import { BaseService } from 'core/services';
import DonorAccountInvestmentRouteService from './DonorAccountInvestmentRouteService';

class DonorAccountInvestmentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorAccountInvestmentRouteService());
        this.apiClient = apiClient;
    }
}

export default DonorAccountInvestmentService;
