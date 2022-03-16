import { BaseService } from 'core/services';
import SessionPendingCertificateRouteService from './SessionPendingCertificateRouteService';

class SessionPendingCertificateService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionPendingCertificateRouteService());
        this.apiClient = apiClient;
    }
    getAdminReviewCertificates(resource) {
        var url = this.routeService.getAdminReviewCertificates(resource);
        return this.apiClient.get(url);
    }
    putAdminReviewCertificates(resource) {
        var url = this.routeService.putAdminReviewCertificates(resource);
        return this.apiClient.put(url);
    }
}

export default SessionPendingCertificateService;
