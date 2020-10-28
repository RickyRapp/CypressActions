import { BookletService } from 'application/booklet/services';

class BookletStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletService = moduleStore.rootStore.createApplicationService(BookletService);
    }

    async findBooklets(params) {
        const response = await this.bookletService.find(params);
        return response.data;
    }
}
export default BookletStore;
