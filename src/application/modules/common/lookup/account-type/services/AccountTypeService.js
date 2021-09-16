import { BaseService } from 'core/services';
import { AccountTypeRouteService } from 'application/common/lookup/account-type/services';

class AccountTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new AccountTypeRouteService());
	}
}

export default AccountTypeService;
