import { BaseRouteService } from 'core/services';

class InvestmentPoolRouteService extends BaseRouteService {
	constructor() {
		super('investment-pool');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default InvestmentPoolRouteService;
