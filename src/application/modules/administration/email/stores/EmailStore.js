import { EmailService } from 'application/administration/email/services';

class EmailStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.emailService = moduleStore.rootStore.createApplicationService(EmailService);
    }

    async findEmail(params) {
        const response = await this.emailService.find(params);
        return response.data;
    }

    async getEmail(id, params) {
        const response = await this.emailService.get(id, params);
        return response.data;
    }
}
export default EmailStore;
