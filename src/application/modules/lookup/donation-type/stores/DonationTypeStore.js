import { DonationTypeService } from 'application/lookup/donation-type/services';
import { cacheService } from 'core/services';

const key = 'donationTypes';

class DonationTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.donationTypeService = moduleStore.rootStore.createApplicationService(DonationTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.donationTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default DonationTypeStore;
