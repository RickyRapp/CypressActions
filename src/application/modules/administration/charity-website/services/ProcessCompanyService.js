import { BaseService } from 'core/services';
import ProcessCompanyRouteService from './ProcessCompanyRouteService';

class ProcessCompanyService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ProcessCompanyRouteService());
        this.apiClient = apiClient;
    }
}

export default ProcessCompanyService;
