import { IncomeTypeService } from 'application/common/lookup/income-type/services';
import { cacheService } from 'core/services';

const key = 'incomeTypes';

class IncomeTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.incomeTypeService = moduleStore.rootStore.createApplicationService(IncomeTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.incomeTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default IncomeTypeStore;
