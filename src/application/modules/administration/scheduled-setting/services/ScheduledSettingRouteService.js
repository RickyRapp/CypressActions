import { BaseRouteService } from 'core/services';

class ScheduledSettingRouteService extends BaseRouteService {
    constructor() {
        super('administration');
    }

    run(name) {
        return super.update(this.base + '/' + name);
    }
}

export default ScheduledSettingRouteService;
