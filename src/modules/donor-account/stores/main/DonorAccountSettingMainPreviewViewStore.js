import { action, observable } from 'mobx';
import { DonorAccountService } from "common/data";
import { BaseViewStore } from 'core/stores';

class DonorAccountSettingMainPreviewViewStore extends BaseViewStore {
    @observable settings = null;

    constructor(rootStore) {
        super(rootStore);
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.getResource();
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.authStore.user.id;
        const response = await this.donorAccountService.getSettings(id);
        this.settings = response;
    }
}

export default DonorAccountSettingMainPreviewViewStore;