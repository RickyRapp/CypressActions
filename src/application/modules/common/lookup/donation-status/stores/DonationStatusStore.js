import { DonationStatusService } from 'application/common/lookup/donation-status/services';
import { cacheService } from 'core/services';

const key = 'donationStatuses';

class DonationStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.donationStatusService = moduleStore.rootStore.createApplicationService(DonationStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.donationStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default DonationStatusStore;
