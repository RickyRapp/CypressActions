import { BaseService } from 'core/services';
import { IncomeTypeRouteService } from 'application/common/lookup/income-type/services';

class IncomeTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new IncomeTypeRouteService());
	}
}

export default IncomeTypeService;
