import { DonorService } from 'application/common/donor/services';

class DashboardStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.donorService = moduleStore.rootStore.createApplicationService(DonorService);
    }

    async loadDashboardData(id) {
        const reponse = await this.donorService.loadDashboardData(id);
        return reponse.data;
    }
}
export default DashboardStore;
