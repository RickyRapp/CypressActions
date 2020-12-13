import { BaseRouteService } from 'core/services';

class BookletStatusRouteService extends BaseRouteService {
	constructor() {
		super('booklet-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default BookletStatusRouteService;
