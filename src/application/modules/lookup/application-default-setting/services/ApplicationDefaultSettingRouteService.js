import { BaseRouteService } from 'core/services';

class ApplicationDefaultSettingRouteService extends BaseRouteService {
	constructor() {
		super('application-default-setting');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default ApplicationDefaultSettingRouteService;
