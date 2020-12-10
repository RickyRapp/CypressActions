import { BaseService } from 'core/services';
import { DonationStatusRouteService } from 'application/common/lookup/donation-status/services';

class DonationStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new DonationStatusRouteService());
	}
}

export default DonationStatusService;
