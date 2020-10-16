import { BaseService } from 'core/services';
import { BookletTypeRouteService } from 'application/lookup/booklet-type/services';

class BookletTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BookletTypeRouteService());
	}
}

export default BookletTypeService;
