import { ReconcileService } from 'application/administration/reconcile/services';

class ReconcileStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.reconcileService = moduleStore.rootStore.createApplicationService(ReconcileService);
    }

    async findReconcile(params) {
        const response = await this.reconcileService.find(params);
        return response.data;
    }

    async getReconcile(id, params) {
        const response = await this.reconcileService.get(id, params);
        return response.data;
    }

    async updateReconcile(resource) {
        const response = await this.reconcileService.update(resource);
        return response.data;
    }

    async checkUpdate(resource) {
        const response = await this.reconcileService.checkUpdate(resource);
        return response.data;
    }
}
export default ReconcileStore;
