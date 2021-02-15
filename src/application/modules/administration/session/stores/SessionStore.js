import { SessionService } from 'application/administration/session/services';

class SessionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.sessionService = moduleStore.rootStore.createApplicationService(SessionService);
    }

    async findSession(params) {
        const response = await this.sessionService.find(params);
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

    async updateBlankCertificate(resource) {
        const response = await this.sessionService.updateBlankCertificate(resource);
        return response.data;
    }

    async updateBlankCertificate(resource) {
        const response = await this.sessionService.removeCertificate(resource);
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
}
export default SessionStore;