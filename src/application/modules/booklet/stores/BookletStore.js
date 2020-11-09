import { BookletService } from 'application/booklet/services';

class BookletStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletService = moduleStore.rootStore.createApplicationService(BookletService);
    }

    async get(id, options) {
        const response = await this.bookletService.get(id, options);
        return response.data;
    }

    async find(params) {
        const response = await this.bookletService.find(params);
        return response.data;
    }

    async updateCertificate(resource){
        const response = await this.bookletService.updateCertificate(resource);
        return response.data;
    }
}
export default BookletStore;
