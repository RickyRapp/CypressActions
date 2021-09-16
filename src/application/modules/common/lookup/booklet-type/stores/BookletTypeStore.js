import { BookletTypeService } from 'application/common/lookup/booklet-type/services';
import { cacheService } from 'core/services';

const key = 'bookletTypes';

class BookletTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.bookletTypeService = moduleStore.rootStore.createApplicationService(BookletTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.bookletTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default BookletTypeStore;
