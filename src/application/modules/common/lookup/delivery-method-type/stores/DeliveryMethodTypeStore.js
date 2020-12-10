import { DeliveryMethodTypeService } from 'application/common/lookup/delivery-method-type/services';
import { cacheService } from 'core/services';

const key = 'deliveryMethodTypes';

class DeliveryMethodTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.deliveryMethodTypeService = moduleStore.rootStore.createApplicationService(DeliveryMethodTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.deliveryMethodTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default DeliveryMethodTypeStore;
