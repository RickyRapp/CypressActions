import { action, runInAction } from 'mobx';
import { ApplicationDefaultSettingEditForm } from 'application/administration/application-default-setting/forms';
import { ApplicationDefaultSettingService } from 'application/administration/application-default-setting/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { LookupService } from 'common/services';

@applicationContext
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

        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore();
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore();
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDeliveryMethodTypes(),
                this.fetchGrantAcknowledgmentTypes(),
                this.fetchGrantPurposeTypes()
            ]);
        }
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        this.deliveryMethodTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantAcknowledgmentTypes() {
        this.grantAcknowledgmentTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
        const response = await service.getAll();
        runInAction(() => {
            this.grantAcknowledgmentTypeDropdownStore.setItems(response.data);
            this.grantAcknowledgmentTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchGrantPurposeTypes() {
        this.grantPurposeTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
        const response = await service.getAll();
        runInAction(() => {
            this.grantPurposeTypeDropdownStore.setItems(response.data);
            this.grantPurposeTypeDropdownStore.setLoading(false);
        });
    }
}

export default ApplicationDefaultSettingEditViewStore;
