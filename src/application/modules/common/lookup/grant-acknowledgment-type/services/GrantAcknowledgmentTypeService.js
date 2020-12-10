import { BaseService } from 'core/services';
import { GrantAcknowledgmentTypeRouteService } from 'application/common/lookup/grant-acknowledgment-type/services';

class GrantAcknowledgmentTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new GrantAcknowledgmentTypeRouteService());
	}
}

export default GrantAcknowledgmentTypeService;
