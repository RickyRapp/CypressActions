import { BaseRouteService } from 'core/services';

class EmailTypeRouteService extends BaseRouteService {
	constructor() {
		super('email-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default EmailTypeRouteService;
