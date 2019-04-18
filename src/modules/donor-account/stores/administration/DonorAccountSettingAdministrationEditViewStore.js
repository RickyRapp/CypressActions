import { BaseEditViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountSettingAdministrationEditForm } from 'modules/donor-account/forms';
import _ from 'lodash';

class DonorAccountSettingAdministrationEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.routerStore.routerState.params.userId,
            actions: {
                update: async donorAccount => {
                    return await donorAccountService.updateSettings({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    const response = await donorAccountService.getSettings(id);
                    return response;
                },
            },
            FormClass: DonorAccountSettingAdministrationEditForm,
            goBack: false
        });
    }
}

export default DonorAccountSettingAdministrationEditViewStore;