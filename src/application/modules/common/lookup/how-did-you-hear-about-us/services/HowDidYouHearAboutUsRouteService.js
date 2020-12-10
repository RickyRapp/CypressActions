import { BaseRouteService } from 'core/services';

class HowDidYouHearAboutUsRouteService extends BaseRouteService {
	constructor() {
		super('how-did-you-hear-about-us');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default HowDidYouHearAboutUsRouteService;
