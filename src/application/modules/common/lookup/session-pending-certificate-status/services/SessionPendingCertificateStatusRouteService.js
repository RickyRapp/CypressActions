import { BaseRouteService } from 'core/services';

class SessionPendingCertificateStatusRouteService extends BaseRouteService {
	constructor() {
		super('session-pending-certificate-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default SessionPendingCertificateStatusRouteService;
