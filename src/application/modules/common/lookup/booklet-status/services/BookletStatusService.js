import { BaseService } from 'core/services';
import { BookletStatusRouteService } from 'application/common/lookup/booklet-status/services';

class BookletStatusService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BookletStatusRouteService());
	}
}

export default BookletStatusService;
