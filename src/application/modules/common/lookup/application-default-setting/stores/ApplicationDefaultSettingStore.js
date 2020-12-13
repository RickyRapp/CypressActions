import { ApplicationDefaultSettingService } from 'application/common/lookup/application-default-setting/services';
import { cacheService } from 'core/services';

const key = 'applicationDefaultSetting';

class ApplicationDefaultSettingStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.applicationDefaultSettingService = moduleStore.rootStore.createApplicationService(ApplicationDefaultSettingService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.applicationDefaultSettingService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default ApplicationDefaultSettingStore;
