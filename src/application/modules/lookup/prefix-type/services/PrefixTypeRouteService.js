import { BaseRouteService } from 'core/services';

class PrefixTypeRouteService extends BaseRouteService {
	constructor() {
		super('prefix-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default PrefixTypeRouteService;
