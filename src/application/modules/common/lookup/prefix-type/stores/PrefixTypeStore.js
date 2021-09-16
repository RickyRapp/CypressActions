import { PrefixTypeService } from 'application/common/lookup/prefix-type/services';
import { cacheService } from 'core/services';

const key = 'prefixTypes';

class PrefixTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.prefixTypeService = moduleStore.rootStore.createApplicationService(PrefixTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.prefixTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default PrefixTypeStore;
