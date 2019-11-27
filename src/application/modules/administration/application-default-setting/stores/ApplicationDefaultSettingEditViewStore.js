import { ApplicationDefaultSettingEditForm } from 'application/administration/application-default-setting/forms';
import { ApplicationDefaultSettingService } from 'application/administration/application-default-setting/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';

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
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
                const response = await service.getAll();
                return response.data;
            }
        });
    }
}

export default ApplicationDefaultSettingEditViewStore;
