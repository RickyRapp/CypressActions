import { BaseService } from 'core/services';
import { PaymentTypeRouteService } from 'application/common/lookup/payment-type/services';

class PaymentTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new PaymentTypeRouteService());
	}
}

export default PaymentTypeService;
