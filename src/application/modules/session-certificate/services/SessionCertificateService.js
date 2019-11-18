import { BaseService } from 'core/services';
import SessionCertificateRouteService from './SessionCertificateRouteService';

class SessionCertificateService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new SessionCertificateRouteService());
        this.apiClient = apiClient;
    }
}

export default SessionCertificateService;
