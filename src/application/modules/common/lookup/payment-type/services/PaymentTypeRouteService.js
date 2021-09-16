import { BaseRouteService } from 'core/services';

class PaymentTypeRouteService extends BaseRouteService {
	constructor() {
		super('payment-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default PaymentTypeRouteService;
