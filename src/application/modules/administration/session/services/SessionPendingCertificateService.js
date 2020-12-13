import { BaseService } from 'core/services';
import SessionPendingCertificateRouteService from './SessionPendingCertificateRouteService';

class SessionPendingCertificateService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionPendingCertificateRouteService());
        this.apiClient = apiClient;
    }
}

export default SessionPendingCertificateService;
