import { AccountTypeService } from 'application/lookup/account-type/services';
import { cacheService } from 'core/services';

const key = 'accountTypes';

class AccountTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.accountTypeService = moduleStore.rootStore.createApplicationService(AccountTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.accountTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default AccountTypeStore;
