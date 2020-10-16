import { BaseRouteService } from 'core/services';

class AccountTypeRouteService extends BaseRouteService {
	constructor() {
		super('account-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default AccountTypeRouteService;
