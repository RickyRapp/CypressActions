import { BookletOrderService } from 'application/common/booklet-order/services';

class BookletOrderStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletOrderService = moduleStore.rootStore.createApplicationService(BookletOrderService);
    }

    async getBookletOrder(id, options) {
        const response = await this.bookletOrderService.get(id, options);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.bookletOrderService.getDonorInformation(id);
        return response.data;
    }

    async findBookletOrder(params) {
        const response = await this.bookletOrderService.find(params);
        return response.data;
    }

    async createBookletOrder(resource) {
        const response = await this.bookletOrderService.create(resource);
        return response.data;
    }

    async updateBookletOrder(resource) {
        const response = await this.bookletOrderService.update(resource);
        return response.data;
    }
}
export default BookletOrderStore;
