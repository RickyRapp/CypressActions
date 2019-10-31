import { BaseService } from 'core/services';
import ScannerConnectionRouteService from './ScannerConnectionRouteService';

class ScannerConnectionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ScannerConnectionRouteService());
        this.apiClient = apiClient;
    }

    createSetting(resource) {
        const url = this.routeService.createSetting();
        return this.apiClient.post(url, resource);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }
}

export default ScannerConnectionService;
