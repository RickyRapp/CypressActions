import { BaseService } from 'core/services';
import FundTransferRouteService from './FundTransferRouteService';

class FundTransferService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FundTransferRouteService());
        this.apiClient = apiClient;
    }
}

export default FundTransferService;
