import { BaseRouteService } from "core/services";

class remoteDepositRouteService extends BaseRouteService {
    constructor() {
        super('session');
        this.sessionScanBase = 'session-scan';
        this.fileStreamBase = 'charity-file-streams';
    }

    find(filter) {
        return super.find(this.base + '/{?search,confirmationNumber,donorId,isCharityAccount,donationStatusIds,paymentTypeIds,paymentNumber,bookletCertificateCode,dollarRange,phoneNumber,sessionEmail,usernameCreatedSession,fundraiserName,dateCreatedFrom,dateCreatedTo,name,charityId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/charity/{id}/{?embed,fields}', id, options);
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

    removeCertificateFromOpenSession() {
        return super.create(this.sessionScanBase + '/step3-remove-certificate');
    }

    setBlankCertificateFromOpenSession() {
        return super.create(this.sessionScanBase + '/step3-set-blank-certificate');
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
    
    uploadBlankCertificate(certificateId, filename) {
        return super.create(this.fileStreamBase + '/certificate/{certificateId}/{filename}/', { certificateId: certificateId, filename: filename });
    }
}

export default remoteDepositRouteService;