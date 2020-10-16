import { BaseService } from 'core/services';
import { PrefixTypeRouteService } from 'application/lookup/prefix-type/services';

class PrefixTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new PrefixTypeRouteService());
	}
}

export default PrefixTypeService;
