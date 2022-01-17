import { BaseService } from 'core/services';
import ReconcileRouteService from './ReconcileRouteService';

class ReconcileService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ReconcileRouteService());
        this.apiClient = apiClient;
    }

    checkUpdate(resource) {
        const url = this.routeService.checkUpdate(resource);
        return this.apiClient.put(url, resource);
    }

    generateReport(resource) {
        const url = this.routeService.generateReport(resource);
        return this.apiClient.request({
            method: 'PUT',
            url: url,
            data: resource,
            headers: { Accept: resource.contentType },
            responseType: 'blob',
        });
    }

    uploadFile(resource) {
        const url = this.routeService.uploadFile(resource);
        return this.apiClient.put(url, resource);
    }
    
}

export default ReconcileService;
