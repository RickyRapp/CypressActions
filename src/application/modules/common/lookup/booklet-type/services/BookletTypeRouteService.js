import { BaseRouteService } from 'core/services';

class BookletTypeRouteService extends BaseRouteService {
	constructor() {
		super('booklet-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default BookletTypeRouteService;
