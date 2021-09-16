import { DenominationTypeService } from 'application/common/lookup/denomination-type/services';
import { cacheService } from 'core/services';

const key = 'denominationTypes';

class DenominationTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.denominationTypeService = moduleStore.rootStore.createApplicationService(DenominationTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.denominationTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default DenominationTypeStore;
