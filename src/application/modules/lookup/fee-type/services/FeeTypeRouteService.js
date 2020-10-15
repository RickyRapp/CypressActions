import { BaseRouteService } from 'core/services';

class FeeTypeRouteService extends BaseRouteService {
	constructor() {
		super('fee-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default FeeTypeRouteService;
