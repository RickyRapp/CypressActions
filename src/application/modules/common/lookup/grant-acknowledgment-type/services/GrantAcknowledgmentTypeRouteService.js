import { BaseRouteService } from 'core/services';

class GrantAcknowledgmentTypeRouteService extends BaseRouteService {
	constructor() {
		super('grant-acknowledgment-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default GrantAcknowledgmentTypeRouteService;
