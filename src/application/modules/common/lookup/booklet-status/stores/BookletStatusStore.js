import { BookletStatusService } from 'application/common/lookup/booklet-status/services';
import { cacheService } from 'core/services';

const key = 'bookletStatuss';

class BookletStatusStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.bookletStatusService = moduleStore.rootStore.createApplicationService(BookletStatusService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.bookletStatusService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default BookletStatusStore;
