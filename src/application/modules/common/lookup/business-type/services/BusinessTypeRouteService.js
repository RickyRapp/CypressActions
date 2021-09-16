import { BaseRouteService } from 'core/services';

class BusinessTypeRouteService extends BaseRouteService {
	constructor() {
		super('business-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default BusinessTypeRouteService;
