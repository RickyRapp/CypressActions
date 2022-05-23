import { SessionService, SessionPendingCertificateService } from 'application/administration/session/services';

class SessionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.sessionService = moduleStore.rootStore.createApplicationService(SessionService);
        this.sessionPendingCertificateService = moduleStore.rootStore.createApplicationService(SessionPendingCertificateService);
    }

    async findSession(params) {
        const response = await this.sessionService.find(params);
        return response.data;
    }

    async findSessionForDonorReview(params) {
        const response = await this.sessionService.findSessionForDonorReview(params);
        return response.data;
    }

    async findSessionPendingCertificate(params) {
        const response = await this.sessionPendingCertificateService.find(params);
        return response.data;
    }

    async findAdminReviewCertificate(params) {
        const response = await this.sessionPendingCertificateService.getAdminReviewCertificates(params);
        return response.data;
    }

    async updateAdminReviewCertificate(params) {
        const response = await this.sessionPendingCertificateService.putAdminReviewCertificates(params);
        return response.data;
    }

    async getSession(id, params) {
        const response = await this.sessionService.get(id, params);
        return response.data;
    }

    async createInitialSession(resource) {
        const response = await this.sessionService.createInitialSession(resource);
        return response.data;
    }

    async finishSession(resource) {
        const response = await this.sessionService.finishSession(resource);
        return response.data;
    }

    async addCertificate(resource) {
        const response = await this.sessionService.addCertificate(resource);
        return response.data;
    }

    async setBlankCertificate(resource) {
        const response = await this.sessionService.setBlankCertificate(resource);
        return response.data;
    }

    async setBlankCertificateFromOpenSession(resource) {
        const response = await this.sessionService.setBlankCertificateFromOpenSession(resource);
        return response.data;
    }

    async updateBlankCertificate(resource) {
        const response = await this.sessionService.updateBlankCertificate(resource);
        return response.data;
    }

    async removeCertificate(resource) {
        const response = await this.sessionService.removeCertificate(resource);
        return response.data;
    }

    async removeCertificateFromOpenSession(resource) {
        const response = await this.sessionService.removeCertificateFromOpenSession(resource);
        return response.data;
    }

    async reviewBlankCertificate(resource) {
        const response = await this.sessionService.reviewBlankCertificate(resource);
        return response.data;
    }

    async reviewToken(resource) {
        const response = await this.sessionService.reviewToken(resource);
        return response.data;
    }

    async updateSession(resource) {
        const response = await this.sessionService.update(resource);
        return response.data;
    }

    async inActivateSession(resource) {
        const response = await this.sessionService.inActivateSession(resource);
        return response.data;
    }
}
export default SessionStore;