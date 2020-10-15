import { BaseService } from 'core/services';
import { CharityTypeRouteService } from 'application/lookup/charity-type/services';

class CharityTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new CharityTypeRouteService());
	}
}

export default CharityTypeService;
