import { EntityStatusLogService } from 'application/common/grant/services';

class EntityStatusLogStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.entityStatusLogService = moduleStore.rootStore.createApplicationService(EntityStatusLogService);
    }

    async findStatus(resources,type) {
        const response = await this.entityStatusLogService.findStatus(resources,type);
        return response.data;
    }
}
export default EntityStatusLogStore;
