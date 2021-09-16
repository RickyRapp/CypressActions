import { ContributionStatusService } from 'application/common/lookup/contribution-status/services';
import { cacheService } from 'core/services';

const key = 'contributionStatuses';

class ContributionStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.contributionStatusService = moduleStore.rootStore.createApplicationService(ContributionStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.contributionStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default ContributionStatusStore;
