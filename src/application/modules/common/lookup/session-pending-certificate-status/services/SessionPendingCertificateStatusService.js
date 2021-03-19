import { BaseService } from 'core/services';
import { SessionPendingCertificateStatusRouteService } from 'application/common/lookup/session-pending-certificate-status/services';

class SessionPendingCertificateStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new SessionPendingCertificateStatusRouteService());
	}
}

export default SessionPendingCertificateStatusService;
