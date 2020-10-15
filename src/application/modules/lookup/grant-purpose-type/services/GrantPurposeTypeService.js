import { BaseService } from 'core/services';
import { GrantPurposeTypeRouteService } from 'application/lookup/grant-purpose-type/services';

class GrantPurposeTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new GrantPurposeTypeRouteService());
	}
}

export default GrantPurposeTypeService;
