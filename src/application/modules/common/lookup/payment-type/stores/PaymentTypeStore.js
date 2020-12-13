import { PaymentTypeService } from 'application/common/lookup/payment-type/services';
import { cacheService } from 'core/services';

const key = 'paymentTypes';

class PaymentTypeStore {
	constructor(moduleStore) {
		this.moduleStore = moduleStore;
		this.paymentTypeService = moduleStore.rootStore.createApplicationService(PaymentTypeService);
		this.find = this.find.bind(this);
	}

	async find() {
		let data = cacheService.get(key);
		if (!data) {
			const response = await this.paymentTypeService.find();
			data = response.data;
			cacheService.add(key, data);
		}
		return data;
	}
}

export default PaymentTypeStore;
