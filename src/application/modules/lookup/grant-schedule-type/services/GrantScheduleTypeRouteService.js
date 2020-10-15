import { BaseRouteService } from 'core/services';

class GrantScheduleTypeRouteService extends BaseRouteService {
	constructor() {
		super('grant-schedule-type');
	}

	find = () => {
		return super.find(this.base);
	};
}

export default GrantScheduleTypeRouteService;
