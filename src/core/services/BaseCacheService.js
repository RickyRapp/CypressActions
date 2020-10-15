import { cacheService } from 'core/services';

class BaseCacheService {
	constructor(cacheKey, region, getFn) {
		this.getFn = getFn;
		this.cacheKey = cacheKey;
		this.region = region;
	}

	async getAll() {
		let items = cacheService.get(this.cacheKey, this.region);
		if (!items) {
			const data = await this.getFn();
			this.setItems(data);
			items = cacheService.get(this.cacheKey, this.region);
		}

		return items;
	}

	removeItems() {
		cacheService.remove(this.cacheKey, this.region);
	}

	setItems(data) {
		if (!data) {
			return;
		}
		cacheService.add(this.cacheKey, data, this.region);
	}
}

export default BaseCacheService;
