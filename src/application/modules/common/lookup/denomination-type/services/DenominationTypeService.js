import { BaseService } from 'core/services';
import { DenominationTypeRouteService } from 'application/common/lookup/denomination-type/services';

class DenominationTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new DenominationTypeRouteService());
	}
}

export default DenominationTypeService;
