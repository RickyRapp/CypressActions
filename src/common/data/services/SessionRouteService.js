import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class SessionRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'session/';
        this.baseScannerConnection = 'scanner-connection/';
        this.uriTemplateService = uritemplate;
    }

    createScannerConnection(resource) {
        return super.create(this.baseScannerConnection, resource);
    }

    createSessionInformation(resource) {
        return super.create(this.baseScannerConnection + 'session-info/', resource);
    }

    finishSession(resource) {
        return this.uriTemplateService.parse(this.base + 'finish/{key}').expand(resource);
    }

    addCertificate(resource) {
        return this.uriTemplateService.parse(this.base + 'add-certificate/{key}/{id}').expand(resource);
    }

    getExistingSession(resource) {
        return this.uriTemplateService.parse(this.baseScannerConnection + 'get-existing-session/{key}').expand(resource);
    }

    setConnectionId(resource) {
        return this.uriTemplateService.parse(this.baseScannerConnection + 'connection-id/{id}').expand(resource);
    }

    continueLater(resource) {
        return this.uriTemplateService.parse(this.baseScannerConnection + 'continue-later/{key}').expand(resource);
    }
}

export default SessionRouteService;
