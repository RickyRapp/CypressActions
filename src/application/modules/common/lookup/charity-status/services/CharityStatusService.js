import { BaseService } from 'core/services';
import { CharityStatusRouteService } from 'application/common/lookup/charity-status/services';

class CharityStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new CharityStatusRouteService());
	}
}

export default CharityStatusService;
