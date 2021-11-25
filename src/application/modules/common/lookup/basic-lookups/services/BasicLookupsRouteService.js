import { BaseRouteService } from 'core/services';

class BasicLookupsRouteService extends BaseRouteService {
	constructor() {
		super('basic-lookups');
	}

	invalidate = () => {
		return super.get(this.base + '/invalidate-all');
	};
}

export default BasicLookupsRouteService;
