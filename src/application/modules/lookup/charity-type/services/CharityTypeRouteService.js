import { BaseRouteService } from 'core/services';

class CharityTypeRouteService extends BaseRouteService {
	constructor() {
		super('charity-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default CharityTypeRouteService;
