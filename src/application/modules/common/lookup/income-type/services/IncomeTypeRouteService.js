import { BaseRouteService } from 'core/services';

class IncomeTypeRouteService extends BaseRouteService {
	constructor() {
		super('income-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default IncomeTypeRouteService;
