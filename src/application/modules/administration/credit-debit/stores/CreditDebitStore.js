import { CreditDebitService } from 'application/administration/credit-debit/services';

class CreditDebitStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.creditDebitService = moduleStore.rootStore.createApplicationService(CreditDebitService);
    }

    async findCreditDebit(params) {
        const response = await this.creditDebitService.find(params);
        return response.data;
    }

    async getCreditDebit(id, options) {
        const response = await this.creditDebitService.get(id, options);
        return response.data;
    }

    async createCreditDebit(resource) {
        const response = await this.creditDebitService.create(resource);
        return response.data;
    }

    async updateCreditDebit(resource) {
        const response = await this.creditDebitService.update(resource);
        return response.data;
    }

    async reviewCreditDebit(resource) {
        const response = await this.creditDebitService.review(resource);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.creditDebitService.getDonorInformation(id);
        return response.data;
    }
}
export default CreditDebitStore;
