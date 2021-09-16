import { BookletService } from 'application/common/booklet/services';
import { BookletOrderService } from 'application/common/booklet-order/services';

class BookletOrderStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletOrderService = moduleStore.rootStore.createApplicationService(BookletOrderService);
        this.bookletService = moduleStore.rootStore.createApplicationService(BookletService);
    }

    async findBookletOrder(params) {
        const response = await this.bookletOrderService.find(params);
        return response.data;
    }

    async findBooklets(params) {
        const response = await this.bookletService.find(params);
        return response.data;
    }

    async getBookletOrder(id, options) {
        const response = await this.bookletOrderService.get(id, options);
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

    async reviewBookletOrder(resource) {
        const response = await this.bookletOrderService.review(resource);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.bookletOrderService.getDonorInformation(id);
        return response.data;
    }
}
export default BookletOrderStore;
