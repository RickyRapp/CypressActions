import { InvestmentPoolService } from 'application/lookup/investment-pool/services';
import { cacheService } from 'core/services';

const key = 'InvestmentPools';

class InvestmentPoolStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.investmentPoolService = moduleStore.rootStore.createApplicationService(InvestmentPoolService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.investmentPoolService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default InvestmentPoolStore;
