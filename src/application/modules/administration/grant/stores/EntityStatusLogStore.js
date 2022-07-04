import { EntityStatusLogService } from 'application/common/grant/services';

class EntityStatusLogStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.entityStatusLogService = moduleStore.rootStore.createApplicationService(EntityStatusLogService);
    }

    async findStatus(resources) {
        const response = await this.entityStatusLogService.findStatus(resources);
        return response.data;
    }
}
export default EntityStatusLogStore;
