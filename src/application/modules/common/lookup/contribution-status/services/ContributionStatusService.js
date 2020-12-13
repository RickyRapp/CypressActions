import { BaseService } from 'core/services';
import { ContributionStatusRouteService } from 'application/common/lookup/contribution-status/services';

class ContributionStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new ContributionStatusRouteService());
	}
}

export default ContributionStatusService;
