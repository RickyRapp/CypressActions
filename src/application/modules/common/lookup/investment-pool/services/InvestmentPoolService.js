import { BaseService } from 'core/services';
import { InvestmentPoolRouteService } from 'application/common/lookup/investment-pool/services';

class InvestmentPoolService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new InvestmentPoolRouteService());
	}
}

export default InvestmentPoolService;
