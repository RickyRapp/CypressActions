import { GrantScheduleTypeService } from 'application/common/lookup/grant-schedule-type/services';
import { cacheService } from 'core/services';

const key = 'grantScheduleTypes';

class GrantScheduleTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.grantScheduleTypeService = moduleStore.rootStore.createApplicationService(GrantScheduleTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.grantScheduleTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default GrantScheduleTypeStore;
