import { BaseService } from 'core/services';
import { PaymentTypeRouteService } from 'application/lookup/payment-type/services';

class PaymentTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new PaymentTypeRouteService());
	}
}

export default PaymentTypeService;
