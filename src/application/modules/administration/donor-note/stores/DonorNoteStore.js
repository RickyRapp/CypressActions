import { DonorNoteService } from 'application/administration/donor-note/services';

class DonorNoteStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorNoteService = moduleStore.rootStore.createApplicationService(DonorNoteService);
    }

    async findDonorNote(params) {
        const response = await this.donorNoteService.find(params);
        return response.data;
    }

    async getDonorNote(id, params) {
        const response = await this.donorNoteService.get(id, params);
        return response.data;
    }

    async createDonorNote(resource) {
        const response = await this.donorNoteService.create(resource);
        return response.data;
    }

    async updateDonorNote(resource) {
        const response = await this.donorNoteService.update(resource);
        return response.data;
    }
}
export default DonorNoteStore;
