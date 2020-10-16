import { BaseService } from 'core/services';
import { BookletOrderStatusRouteService } from 'application/lookup/booklet-order-status/services';

class BookletOrderStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BookletOrderStatusRouteService());
	}
}

export default BookletOrderStatusService;
