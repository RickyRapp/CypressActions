import { BaseRouteService } from 'core/services';

class CharityStatusRouteService extends BaseRouteService {
	constructor() {
		super('charity-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default CharityStatusRouteService;
