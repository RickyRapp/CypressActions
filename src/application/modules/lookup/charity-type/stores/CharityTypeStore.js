import { CharityTypeService } from 'application/lookup/charity-type/services';
import { cacheService } from 'core/services';

const key = 'charityTypes';

class CharityTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.charityTypeService = moduleStore.rootStore.createApplicationService(CharityTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.charityTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default CharityTypeStore;
