import { BusinessTypeService } from 'application/common/lookup/business-type/services';
import { cacheService } from 'core/services';

const key = 'businessTypes';

class BusinessTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.businessTypeService = moduleStore.rootStore.createApplicationService(BusinessTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.businessTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default BusinessTypeStore;
