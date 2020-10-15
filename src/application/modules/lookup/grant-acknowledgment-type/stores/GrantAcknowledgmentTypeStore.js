import { GrantAcknowledgmentTypeService } from 'application/lookup/grant-acknowledgment-type/services';
import { cacheService } from 'core/services';

const key = 'grantAcknowledgmentTypes';

class GrantAcknowledgmentTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.grantAcknowledgmentTypeService = moduleStore.rootStore.createApplicationService(GrantAcknowledgmentTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.grantAcknowledgmentTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default GrantAcknowledgmentTypeStore;
