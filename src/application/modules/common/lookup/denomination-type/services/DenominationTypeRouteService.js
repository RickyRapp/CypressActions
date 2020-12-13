import { BaseRouteService } from 'core/services';

class DenominationTypeRouteService extends BaseRouteService {
	constructor() {
		super('denomination-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default DenominationTypeRouteService;
