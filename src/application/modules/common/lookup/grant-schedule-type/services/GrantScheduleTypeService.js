import { BaseService } from 'core/services';
import { GrantScheduleTypeRouteService } from 'application/common/lookup/grant-schedule-type/services';

class GrantScheduleTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new GrantScheduleTypeRouteService());
	}
}

export default GrantScheduleTypeService;
