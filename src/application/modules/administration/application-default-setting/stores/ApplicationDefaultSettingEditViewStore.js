import { ApplicationDefaultSettingEditForm } from 'application/administration/application-default-setting/forms';
import { ApplicationDefaultSettingService } from 'application/administration/application-default-setting/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';

class ApplicationDefaultSettingEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {

        super(rootStore, {
            name: 'application-default-setting',
            id: 1,
            Form: ApplicationDefaultSettingEditForm,
            actions: () => {
                const service = new ApplicationDefaultSettingService(rootStore.application.baasic.apiClient);
                return {
                    get: async () => {
                        const response = await service.get();
                        return response.data;
                    },
                    update: async (resource) => {
                        const response = await service.update(resource);
                        return response.data;
                    }
                }
            },
            FormClass: ApplicationDefaultSettingEditForm,
        });

        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.deliveryMethodTypeStore.find();
            }
        });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
            }
        });
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.grantPurposeTypeStore.find();
            }
        });
    }
}

export default ApplicationDefaultSettingEditViewStore;
