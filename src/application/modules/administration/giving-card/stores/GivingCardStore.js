import { GivingCardService } from 'application/administration/giving-card/services';

class GivingCardStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.givingCardService = moduleStore.rootStore.createApplicationService(GivingCardService);
    }

    async findGivingCard(params) {
        const response = await this.givingCardService.find(params);
        return response.data;
    }

    async getGivingCard(id, params) {
        const response = await this.givingCardService.get(id, params);
        return response.data;
    }

    async updateGivingCard(resource) {
        const response = await this.givingCardService.update(resource);
        return response.data;
    }
}
export default GivingCardStore;
