import { BaseService } from 'core/services';
import SessionRouteService from './SessionRouteService';

class SessionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionRouteService());
        this.apiClient = apiClient;
    }

    async createSessionInformation(resource) {
        var url = this.routeService.createSessionInformation();
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async getExistingSession(resource) {
        var url = this.routeService.getExistingSession(resource);
        const response = await this.apiClient.get(url);
        return response || null;
    }

    async findSessionInProgress(resource) {
        var url = this.routeService.findSessionInProgress(resource);
        const response = await this.apiClient.get(url);
        return response || null;
    }

    async setConnectionId(resource) {
        var url = this.routeService.setConnectionId(resource);
        const response = await this.apiClient.post(url);
        return response || null;
    }

    async addCertificate(resource) {
        var url = this.routeService.addCertificate(resource);
        const response = await this.apiClient.get(url);
        return response || null;
    }

    async inActivateSession(resource) {
        var url = this.routeService.inActivateSession(resource);
        const response = await this.apiClient.put(url);
        return response || null;
    }

    async finishSession(resource) {
        var url = this.routeService.finishSession(resource);
        const response = await this.apiClient.post(url);
        return response || null;
    }

    async removeCertificate(resource) {
        var url = this.routeService.removeCertificate();
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async setBlankCertificate(resource) {
        var url = this.routeService.setBlankCertificate();
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }

    async updateBlankCertificate(resource) {
        var url = this.routeService.updateBlankCertificate();
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }

    async review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }
}

export default SessionService;
