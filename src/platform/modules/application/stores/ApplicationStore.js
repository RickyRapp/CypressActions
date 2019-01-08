import { action } from 'mobx';

class ApplicationStore {
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.applicationService = this.moduleStore.rootStore.platform.baasic.applicationSettingModule;

        this.find = this.find.bind(this);
    }

    @action async find(filter) {
        const response = await this.applicationService.find(filter);
        return response.data;
    }
}

export default ApplicationStore;