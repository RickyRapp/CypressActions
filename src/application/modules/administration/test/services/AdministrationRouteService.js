import { BaseRouteService } from 'core/services';

class AdministrationRouteService extends BaseRouteService {
    constructor() {
        super('administration');
    }

    run(name) {
        return super.update(this.base + '/' + name);
    }

    sendEmail(resource) {
        return super.update(this.base + '/send-test-mail/{template}', resource);
    }
}

export default AdministrationRouteService;
