import { BaseRouteService } from 'core/services';

class EmailSenderRouteService extends BaseRouteService {
	constructor() {
		super('email-sender');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default EmailSenderRouteService;
