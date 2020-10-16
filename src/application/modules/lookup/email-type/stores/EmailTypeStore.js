import { EmailTypeService } from 'application/lookup/email-type/services';
import { cacheService } from 'core/services';

const key = 'emailTypes';

class EmailTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.emailTypeService = moduleStore.rootStore.createApplicationService(EmailTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.emailTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default EmailTypeStore;
