import { BaseRouteService } from 'core/services';

class SessionRouteService extends BaseRouteService {
    constructor() {
        super('session');
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
}

export default SessionRouteService;
