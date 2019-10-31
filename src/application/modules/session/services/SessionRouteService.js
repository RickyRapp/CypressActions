import { BaseRouteService } from 'core/services';

class SessionRouteService extends BaseRouteService {
    constructor() {
        super('session');
    }

    find(filter) {
        return super.find(this.base + '/{?search,name,taxId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    create() {
        return super.create(this.base);
    }

    createSessionInformation(resource) {
        return super.create(this.base + '/session-info', resource);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    getExistingSession(resource) {
        return super.find(this.base + '/existing-session/{key}', resource);
    }

    findSessionInProgress(filter) {
        return super.get(this.base + '/existing-sessions', filter);
    }

    setConnectionId(resource) {
        return super.update(this.base + '/connection-id/{id}', resource);
    }

    addCertificate(resource) {
        return super.find(this.base + '/add-certificate/{key}/{id}', resource);
    }

    inActivateSession(resource) {
        return super.update(this.base + '/in-activate/{key}', resource);
    }

    finishSession(resource) {
        return super.create(this.base + '/finish/{key}', resource);
    }
}

export default SessionRouteService;
