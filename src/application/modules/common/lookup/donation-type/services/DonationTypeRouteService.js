import { BaseRouteService } from 'core/services';

class DonationTypeRouteService extends BaseRouteService {
	constructor() {
		super('donation-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default DonationTypeRouteService;
