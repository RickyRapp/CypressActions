import { BaseRouteService } from 'core/services';

class GrantPurposeTypeRouteService extends BaseRouteService {
	constructor() {
		super('grant-purpose-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default GrantPurposeTypeRouteService;
