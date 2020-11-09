import { CharityService } from 'application/charity/services';
import { SessionService } from 'application/session/services';
import { FeeService } from 'common/services';

class SessionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.sessionService = moduleStore.rootStore.createApplicationService(SessionService);
        this.feeService = moduleStore.rootStore.createApplicationService(FeeService);
        this.charityService = moduleStore.rootStore.createApplicationService(CharityService);
    }

    async findSession(params) {
        const response = await this.sessionService.find(params);
        return response.data;
    }

    async searchCharity(params) {
        const response = await this.charityService.search(params);
        return response.data;
    }

    async createInitialSession(resource) {
        const response = await this.sessionService.createInitialSession(resource);
        return response.data;
    }

    async addCertificate(resource) {
        const response = await this.sessionService.addCertificate(resource);
        return response.data;
    }
}
export default SessionStore;