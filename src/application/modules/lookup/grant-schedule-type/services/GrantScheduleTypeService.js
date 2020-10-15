import { BaseService } from 'core/services';
import { GrantScheduleTypeRouteService } from 'application/lookup/grant-schedule-type/services';

class GrantScheduleTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new GrantScheduleTypeRouteService());
	}
}

export default GrantScheduleTypeService;
