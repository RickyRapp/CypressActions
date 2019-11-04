import { BaseService } from 'core/services';
import ScannerConnectionRouteService from './ScannerConnectionRouteService';

class ScannerConnectionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ScannerConnectionRouteService());
        this.apiClient = apiClient;
    }
}

export default ScannerConnectionService;
