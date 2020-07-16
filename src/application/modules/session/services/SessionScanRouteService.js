import { BaseRouteService } from 'core/services';

class SessionScanRouteService extends BaseRouteService {
    constructor() {
        super('session-scan');
    }

    createSessionInformation(resource) {
        return super.create(this.base + '/step2', resource);
    }

    setUserScannerConnection(resource) {
        return super.create(this.base + '/set-user-scanner-connection', resource);
    }

    getExistingSession(resource) {
        return super.find(this.base + '/step2-existing-session/{key}', resource);
    }

    addCertificate(resource) {
        return super.find(this.base + '/step3/{key}/{id}', resource);
    }

    setConnectionId() {
        return super.create(this.base + '/step3-set-connection');
    }

    setBlankCertificate() {
        return super.create(this.base + '/step3-set-blank-certificate');
    }

    finishSession(resource) {
        return super.create(this.base + '/step4/{key}', resource);
    }
}

export default SessionScanRouteService;
