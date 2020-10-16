import { BaseRouteService } from 'core/services';

class DeliveryMethodTypeRouteService extends BaseRouteService {
	constructor() {
		super('delivery-method-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default DeliveryMethodTypeRouteService;
