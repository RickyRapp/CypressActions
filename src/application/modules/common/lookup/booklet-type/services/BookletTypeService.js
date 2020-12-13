import { BaseService } from 'core/services';
import { BookletTypeRouteService } from 'application/common/lookup/booklet-type/services';

class BookletTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BookletTypeRouteService());
	}
}

export default BookletTypeService;
