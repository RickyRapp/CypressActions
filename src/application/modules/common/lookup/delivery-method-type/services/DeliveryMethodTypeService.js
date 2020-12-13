import { BaseService } from 'core/services';
import { DeliveryMethodTypeRouteService } from 'application/common/lookup/delivery-method-type/services';

class DeliveryMethodTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new DeliveryMethodTypeRouteService());
	}
}

export default DeliveryMethodTypeService;
