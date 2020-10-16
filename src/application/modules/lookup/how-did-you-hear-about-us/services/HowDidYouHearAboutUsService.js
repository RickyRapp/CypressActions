import { BaseService } from 'core/services';
import { HowDidYouHearAboutUsRouteService } from 'application/lookup/how-did-you-hear-about-us/services';

class HowDidYouHearAboutUsService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new HowDidYouHearAboutUsRouteService());
	}
}

export default HowDidYouHearAboutUsService;
