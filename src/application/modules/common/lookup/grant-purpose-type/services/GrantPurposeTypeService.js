import { BaseService } from 'core/services';
import { GrantPurposeTypeRouteService } from 'application/common/lookup/grant-purpose-type/services';

class GrantPurposeTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new GrantPurposeTypeRouteService());
	}
}

export default GrantPurposeTypeService;
