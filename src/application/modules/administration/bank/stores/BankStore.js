import { BankService, RoutingNumberService } from 'application/administration/bank/services';

class BankStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.bankService = moduleStore.rootStore.createApplicationService(BankService);
        this.routingNumberService = moduleStore.rootStore.createApplicationService(RoutingNumberService);
    }

    async findBank(params) {
        const response = await this.bankService.find(params);
        return response.data;
    }

    async findRoutingNumber(params) {
        const response = await this.routingNumberService.find(params);
        return response.data;
    }

    async getBank(id, params) {
        const response = await this.bankService.get(id, params);
        return response.data;
    }

    async getRoutingNumber(id, params) {
        const response = await this.routingNumberService.get(id, params);
        return response.data;
    }

    async updateBank(resource) {
        const response = await this.bankService.update(resource);
        return response.data;
    }

    async updateRoutingNumber(resource) {
        const response = await this.routingNumberService.update(resource);
        return response.data;
    }

    async deleteBank(resource) {
        const response = await this.bankService.delete(resource);
        return response.data;
    }

    async deleteRoutingNumber(resource) {
        const response = await this.routingNumberService.delete(resource);
        return response.data;
    }
}
export default BankStore;
