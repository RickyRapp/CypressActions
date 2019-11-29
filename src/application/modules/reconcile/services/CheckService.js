import { BaseService } from 'core/services';
import CheckRouteService from './CheckRouteService';

class CheckService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CheckRouteService());
        this.apiClient = apiClient;
    }
}

export default CheckService;
