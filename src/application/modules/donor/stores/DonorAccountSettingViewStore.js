import { BaseEditViewStore } from 'core/stores';
import { DonorAccountSettingForm } from 'application/donor/forms';
import { DonorService } from 'application/donor/services';
import { action } from 'mobx';

class DonorAccountSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const service = new DonorService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'account-settings',
            id: id,
            actions: {
                get: async (id) => {
                    const response = await service.get(id);
                    return response.data;
                },
                update: (resource) => {
                    return service.updateAccountSettingsData({ id: this.id, ...resource });
                }
            },
            FormClass: DonorAccountSettingForm,
        });
    }

    @action.bound
    async getResource(id, updateForm = true) {
        await super.getResource(id, updateForm);

        if (!this.hasPermission('theDonorsFundAdministrationSection.update')) {
            this.form.setFieldsDisabled(true);
        }
    }
}

export default DonorAccountSettingViewStore;
