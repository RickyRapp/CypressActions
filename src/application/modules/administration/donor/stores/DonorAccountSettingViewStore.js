import { BaseEditViewStore } from 'core/stores';
import { DonorAccountSettingForm } from 'application/administration/donor/forms';

class DonorAccountSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'account-setting',
            id: rootStore.routerStore.routerState.params.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.administration.donorStore.getDonor(id);
                },
                update: async (resource) => {
                    await rootStore.application.administration.donorStore.updateAccountSetting(resource);
                }
            },
            FormClass: DonorAccountSettingForm,
        });

        this.donorId = this.id;
    }
}

export default DonorAccountSettingViewStore;
