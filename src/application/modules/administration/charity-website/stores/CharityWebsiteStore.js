import { CharityWebsiteService, ProcessCompanyService } from 'application/administration/charity-website/services';

class CharityWebsiteStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.charityWebsiteService = moduleStore.rootStore.createApplicationService(CharityWebsiteService);
        this.processCompanyService = moduleStore.rootStore.createApplicationService(ProcessCompanyService);
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

    async findProcessingCompany(params) {
        const response = await this.processCompanyService.find(params);
        return response.data;
    }

    async getProcessingCompany(id, params){
        const response = await this.processCompanyService.get(id, params);
        return response.data;
    }

    async createProcessingCompany(resource) {
        const response = await this.processCompanyService.create(resource);
        return response.data;
    }

    async updateProcessingCompany(resource) {
        const response = await this.processCompanyService.update(resource);
        return response.data;
    }
}
export default CharityWebsiteStore;
