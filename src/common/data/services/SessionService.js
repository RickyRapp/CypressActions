import { SessionRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class SessionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionRouteService());
        this.apiClient = apiClient;
    }

    async createScannerConnection(resource) {
        var url = this.routeService.createScannerConnection();
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async createSessionInformation(resource) {
        var url = this.routeService.createSessionInformation();
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async finishSession(resource) {
        var url = this.routeService.finishSession(resource);
        debugger;
        const response = await this.apiClient.post(url);
        debugger;
        return response || null;
    }

    async addCertificate(resource) {
        var url = this.routeService.addCertificate(resource);
        const response = await this.apiClient.get(url);
        return response || null;
    }

    async getExistingSession(resource) {
        var url = this.routeService.getExistingSession(resource);
        const response = await this.apiClient.get(url);
        return response || null;
    }

    async setConnectionId(resource) {
        var url = this.routeService.setConnectionId(resource);
        const response = await this.apiClient.post(url);
        return response || null;
    }

    async continueLater(resource) {
        var url = this.routeService.continueLater(resource);
        const response = await this.apiClient.post(url);
        return response || null;
    }
}

export default SessionService;
