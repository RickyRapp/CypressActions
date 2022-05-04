import { BookletService } from 'application/common/booklet/services';

class BookletStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletService = moduleStore.rootStore.createApplicationService(BookletService);
    }

    async getBooklet(id, options) {
        const response = await this.bookletService.get(id, options);
        return response.data;
    }

    async findBooklet(params) {
        const response = await this.bookletService.find(params);
        return response.data;
    }

    async createBooklet(params) {
        const response = await this.bookletService.create(params);
        return response.data;
    }

    async updateCertificate(resource) {
        const response = await this.bookletService.updateCertificate(resource);
        return response.data;
    }

    async exportBooklets(resource) {
        const response = await this.bookletService.export(resource);
        return response.data;
    }

    async remainingAmount(donorId) {
        const response = await this.bookletService.remainingAmount(donorId);
        return response.data;
    }
}
export default BookletStore;
