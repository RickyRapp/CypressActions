import { BaseRouteService } from 'core/services';

class CertificateStatusRouteService extends BaseRouteService {
	constructor() {
		super('certificate-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default CertificateStatusRouteService;
