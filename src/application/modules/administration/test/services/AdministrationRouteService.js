import { BaseRouteService } from 'core/services';

class AdministrationRouteService extends BaseRouteService {
    constructor() {
        super('administration');
    }

    run(name) {
        return super.update(this.base + '/' + name);
    }

    sendBatch(name) {
        return super.update(this.base + '/send-batch-welcome/' + name);
    }

    sendEmail(resource) {
        return super.update(this.base + '/send-test-mail', resource);
    }

    generateReport(resource) {
        return super.update(this.base + '/generate-test-report', resource);
    }
}

export default AdministrationRouteService;
