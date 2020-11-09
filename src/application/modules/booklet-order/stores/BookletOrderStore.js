import { DonorService } from 'application/donor/services';
import { BookletOrderService } from 'application/booklet-order/services';
import { BookletService } from 'application/booklet/services';

class GrantStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bookletOrderService = moduleStore.rootStore.createApplicationService(BookletOrderService);
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
        this.bookletService = moduleStore.rootStore.createApplicationService(BookletService);
    }

    async get(id, options) {
        const response = await this.bookletOrderService.get(id, options);
        return response.data;
    }

    async find(params) {
        const response = await this.bookletOrderService.find(params);
        return response.data;
    }

    async create(resource) {
        const response = await this.bookletOrderService.create(resource);
        return response.data;
    }

    async update(resource) {
        const response = await this.bookletOrderService.update(resource);
        return response.data;
    }

    async review(resource) {
        const response = await this.bookletOrderService.review(resource);
        return response.data;
    }

    async getDonorInformation(id) {
        const response = await this.bookletOrderService.getDonorInformation(id);
        return response.data;
    }

    async searchDonor(params) {
        const response = await this.donorService.search(params);
        return response.data;
    }

    async findBooklets(params) {
        const response = await this.bookletService.find(params);
        return response.data;
    }
}
export default GrantStore;
