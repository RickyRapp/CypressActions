import { ActivityService } from "application/donor/activity/services";

class TransactionStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.activityService = moduleStore.rootStore.createApplicationService(ActivityService);
    }

    async findTransactions(params) {
        const response = await this.activityService.findTransactions(params);
        return response.data;
    }

    async findPendingCheck(params) {
        const response = await this.activityService.findPendingCheck(params);
        return response.data;
    }

    async findPendingCharityCheck(params) {
        const response = await this.activityService.findPendingCharityCheck(params);
        return response.data;
    }

    async loadDonorData(id) {
        const response = await this.activityService.loadDonorData(id);
        return response.data;
    }

    async findDonorToDonorTransactions(params) {
        const response = await this.activityService.findDonorToDonorTransactions(params);
        return response.data;
    }
}
export default TransactionStore;
