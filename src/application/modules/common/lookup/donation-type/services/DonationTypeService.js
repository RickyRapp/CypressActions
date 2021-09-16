import { BaseService } from 'core/services';
import { DonationTypeRouteService } from 'application/common/lookup/donation-type/services';

class DonationTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new DonationTypeRouteService());
	}
}

export default DonationTypeService;
