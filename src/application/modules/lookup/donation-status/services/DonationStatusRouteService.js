import { BaseRouteService } from 'core/services';

class DonationStatusRouteService extends BaseRouteService {
	constructor() {
		super('donation-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default DonationStatusRouteService;
