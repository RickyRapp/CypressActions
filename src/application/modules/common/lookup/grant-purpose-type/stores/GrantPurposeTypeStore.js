import { GrantPurposeTypeService } from 'application/common/lookup/grant-purpose-type/services';
import { cacheService } from 'core/services';

const key = 'grantPurposeTypes';

class GrantPurposeTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.grantPurposeTypeService = moduleStore.rootStore.createApplicationService(GrantPurposeTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.grantPurposeTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default GrantPurposeTypeStore;
