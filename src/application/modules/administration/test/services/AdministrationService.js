import { BaseService } from 'core/services';
import AdministrationRouteService from './AdministrationRouteService';

class AdministrationService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new AdministrationRouteService());
        this.apiClient = apiClient;
    }

    runTask(name) {
        const url = this.routeService.run(name);
        return this.apiClient.put(url);
    }

    sendBatch(name) {
        const url = this.routeService.sendBatch(name);
        return this.apiClient.put(url);
    }

    sendEmail(resource) {
        const url = this.routeService.sendEmail(resource);
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
}

export default AdministrationService;
