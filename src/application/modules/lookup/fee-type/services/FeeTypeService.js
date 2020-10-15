import { BaseService } from 'core/services';
import { FeeTypeRouteService } from 'application/lookup/fee-type/services';

class FeeTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new FeeTypeRouteService());
	}
}

export default FeeTypeService;
