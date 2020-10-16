import { CharityStatusService } from 'application/lookup/charity-status/services';
import { cacheService } from 'core/services';

const key = 'charityStatuses';

class CharityStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.charityStatusService = moduleStore.rootStore.createApplicationService(CharityStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.charityStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default CharityStatusStore;
