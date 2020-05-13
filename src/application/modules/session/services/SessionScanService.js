import { BaseService } from 'core/services';
import SessionScanRouteService from './SessionScanRouteService';

class SessionScanService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionScanRouteService());
        this.apiClient = apiClient;
    }

    createSessionInformation(resource) {
        var url = this.routeService.createSessionInformation();
        return this.apiClient.post(url, resource);
    }

    setUserScannerConnection(resource) {
        var url = this.routeService.setUserScannerConnection();
        return this.apiClient.post(url, resource);
    }

    getExistingSession(resource) {
        var url = this.routeService.getExistingSession(resource);
        return this.apiClient.get(url);
    }

    setConnectionId(resource) {
        var url = this.routeService.setConnectionId();
        return this.apiClient.post(url, resource);
    }

    addCertificate(resource) {
        var url = this.routeService.addCertificate(resource);
        return this.apiClient.get(url);
    }

    finishSession(resource) {
        var url = this.routeService.finishSession(resource);
        return this.apiClient.post(url);
    }

    setBlankCertificate(resource) {
        var url = this.routeService.setBlankCertificate();
        return this.apiClient.post(url, resource);
    }
}

export default SessionScanService;
