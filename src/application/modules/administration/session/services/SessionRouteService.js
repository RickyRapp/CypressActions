import { BaseRouteService } from 'core/services';

class SessionRouteService extends BaseRouteService {
    constructor() {
        super('session');
        this.sessionScanBase = 'session-scan';
    }

    find(filter) {
        return super.find(this.base + '/{?search,confirmationNumber,sessionStatusIds,paymentTypeIds,paymentNumber,bookletCertificateCode,dateCreatedFrom,dateCreatedTo,name,charityId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    create() {
        return super.create(this.base);
    }

    createInitialSession(resource) {
        return super.create(this.sessionScanBase + '/initial', resource);
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
        return super.update(this.sessionScanBase + '/add-certificate', resource);
    }

    inActivateSession(resource) {
        return super.update(this.base + '/in-activate/{key}', resource);
    }

    finishSession(resource) {
        return super.create(this.sessionScanBase + '/step4/{key}', resource);
    }

    removeCertificate() {
        return super.create(this.base + '/remove-certificate');
    }

    setBlankCertificate() {
        return super.create(this.base + '/set-blank-certificate');
    }

    updateBlankCertificate() {
        return super.update(this.base + '/update-blank-certificate');
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }

    reviewBlankCertificate() {
        return super.update(this.base + '/review-blank-certificate');
    }

    removeSessionFromCache(resource) {
        return super.update(this.base + '/remove-existing-session/{key}', resource);
    }
}

export default SessionRouteService;
