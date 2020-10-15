import { FeeTypeService } from 'application/lookup/fee-type/services';
import { cacheService } from 'core/services';

const key = 'feeTypes';

class FeeTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.feeTypeService = moduleStore.rootStore.createApplicationService(FeeTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.feeTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default FeeTypeStore;
