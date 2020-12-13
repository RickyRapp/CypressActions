import { BaseRouteService } from 'core/services';

class BookletOrderStatusRouteService extends BaseRouteService {
	constructor() {
		super('booklet-order-status');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default BookletOrderStatusRouteService;
