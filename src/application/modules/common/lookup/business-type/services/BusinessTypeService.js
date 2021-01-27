import { BaseService } from 'core/services';
import { BusinessTypeRouteService } from 'application/common/lookup/business-type/services';

class BusinessTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BusinessTypeRouteService());
	}
}

export default BusinessTypeService;
