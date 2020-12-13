import { BookletOrderStatusService } from 'application/common/lookup/booklet-order-status/services';
import { cacheService } from 'core/services';

const key = 'bookletOrderStatuss';

class BookletOrderStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.bookletOrderStatusService = moduleStore.rootStore.createApplicationService(BookletOrderStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.bookletOrderStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default BookletOrderStatusStore;
