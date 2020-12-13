import { EmailSenderService } from 'application/common/lookup/email-sender/services';
import { cacheService } from 'core/services';

const key = 'emailSenders';

class EmailSenderStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.emailSenderService = moduleStore.rootStore.createApplicationService(EmailSenderService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.emailSenderService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default EmailSenderStore;
