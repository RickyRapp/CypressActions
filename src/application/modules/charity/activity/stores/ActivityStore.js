import { ActivityService } from 'application/charity/activity/services';

class ActivityStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.activityService = moduleStore.rootStore.createApplicationService(ActivityService);
    }

    async findCharityTransactions(id, options) {
        const response = await this.activityService.findCharityTransactions(id, options);
        return response.data;
    }
}
export default ActivityStore;
