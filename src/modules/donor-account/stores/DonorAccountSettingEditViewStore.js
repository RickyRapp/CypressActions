import { BaseEditViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountSettingEditForm } from 'modules/donor-account/forms';
import _ from 'lodash';

class DonorAccountSettingEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.routerStore.routerState.params.id,
            actions: {
                update: async donorAccount => {
                    await donorAccountService.updateSettings({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    const response = await donorAccountService.getSettings(id);
                    return response;
                },
            },
            FormClass: DonorAccountSettingEditForm,
            goBack: false
        });
    }
}

export default DonorAccountSettingEditViewStore;