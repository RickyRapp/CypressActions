import { BaseService } from 'core/services';
import SessionRouteService from './SessionRouteService';

class SessionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionRouteService());
        this.apiClient = apiClient;
    }

    createInitialSession(resource) {
        var url = this.routeService.createInitialSession();
        return this.apiClient.post(url, resource);
    }

    getExistingSession(resource) {
        var url = this.routeService.getExistingSession(resource);
        return this.apiClient.get(url);
    }

    findSessionInProgress(resource) {
        var url = this.routeService.findSessionInProgress(resource);
        return this.apiClient.get(url);
    }

    setConnectionId(resource) {
        var url = this.routeService.setConnectionId(resource);
        return this.apiClient.post(url);
    }

    addCertificate(resource) {
        var url = this.routeService.addCertificate(resource);
        return this.apiClient.put(url, resource);
    }

    inActivateSession(resource) {
        var url = this.routeService.inActivateSession(resource);
        return this.apiClient.put(url);
    }

    finishSession(resource) {
        var url = this.routeService.finishSession(resource);
        return this.apiClient.post(url);
    }

    removeCertificate(resource) {
        var url = this.routeService.removeCertificate();
        return this.apiClient.post(url, resource);
    }

    setBlankCertificate(resource) {
        var url = this.routeService.setBlankCertificate();
        return this.apiClient.post(url, resource);
    }

    updateBlankCertificate(resource) {
        var url = this.routeService.updateBlankCertificate();
        return this.apiClient.put(url, resource);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    reviewBlankCertificate(resource) {
        const url = this.routeService.reviewBlankCertificate(resource);
        return this.apiClient.put(url, resource);
    }

    removeSessionFromCache(resource) {
        const url = this.routeService.removeSessionFromCache(resource);
        return this.apiClient.put(url, resource);
    }

    reviewToken(resource) {
        const url = this.routeService.reviewToken(resource);
        return this.apiClient.put(url, resource);
    }
}

export default SessionService;
