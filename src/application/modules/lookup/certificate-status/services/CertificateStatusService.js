import { BaseService } from 'core/services';
import { CertificateStatusRouteService } from 'application/lookup/certificate-status/services';

class CertificateStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new CertificateStatusRouteService());
	}
}

export default CertificateStatusService;
