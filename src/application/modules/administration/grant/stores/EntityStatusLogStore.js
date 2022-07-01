import { EntityStatusLogService } from 'application/common/grant/services';

class EntityStatusLogStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.entityStatusLogService = moduleStore.rootStore.createApplicationService(EntityStatusLogService);
  
    }

    async findStatus(params) {
        const response = await this.entityStatusLogService.findStatus(params);
        return response.data;
    }
}
export default EntityStatusLogStore;
