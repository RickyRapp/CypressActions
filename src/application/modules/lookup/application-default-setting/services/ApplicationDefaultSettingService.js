import { BaseService } from 'core/services';
import { ApplicationDefaultSettingRouteService } from 'application/lookup/application-default-setting/services';

class ApplicationDefaultSettingService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new ApplicationDefaultSettingRouteService());
	}
}

export default ApplicationDefaultSettingService;
