import { CharityWebsiteService } from 'application/administration/charity-website/services';

class CharityWebsiteStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityWebsiteService = moduleStore.rootStore.createApplicationService(CharityWebsiteService);
    }

    async findCharityWebsite(params) {
        const response = await this.charityWebsiteService.find(params);
        return response.data;
    }

    async getCharityWebsite(id, params) {
        const response = await this.charityWebsiteService.get(id, params);
        return response.data;
    }

    async createCharityWebsite(resource) {
        const response = await this.charityWebsiteService.create(resource);
        return response.data;
    }

    async updateCharityWebsite(resource) {
        const response = await this.charityWebsiteService.update(resource);
        return response.data;
    }
}
export default CharityWebsiteStore;
