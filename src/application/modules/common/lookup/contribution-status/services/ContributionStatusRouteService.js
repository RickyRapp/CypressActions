import { BaseRouteService } from 'core/services';

class ContributionStatusRouteService extends BaseRouteService {
	constructor() {
		super('contribution-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default ContributionStatusRouteService;
