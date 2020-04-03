import { BaseService } from 'core/services';
import SessionCertificateRouteService from './SessionCertificateRouteService';

class SessionCertificateService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionCertificateRouteService());
        this.apiClient = apiClient;
    }

    reviewToken(resource) {
        var url = this.routeService.reviewToken(resource);
        return this.apiClient.get(url);
    }
}

export default SessionCertificateService;
