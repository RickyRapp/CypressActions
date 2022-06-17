import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorOnlineGrantSettingForm } from 'application/donor/donor/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorOnlineGrantSettingViewStore extends BaseEditViewStore {
    @observable microGiving;
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-online-grant-setting',
            id: rootStore.userStore.applicationUser.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        resource.isMicroGivingEnabled = this.microGiving;
                        await rootStore.application.donor.donorStore.updateOnlineGrantSetting(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.donor.donorStore.getOnlineGrantSetting(id);
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource(this.donorId);
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorOnlineGrantSettingForm,
        });
        this.donorId = this.id;
        this.fetchData();
    }

    async fetchData() {
        var response = await this.rootStore.application.donor.donorStore.getOnlineGrantSetting(this.donorId);
        this.microGiving = response.isMicroGivingEnabled;
    }
    @action.bound
    setMicroGiving() {
        this.microGiving = !this.microGiving;
    }

}

export default DonorOnlineGrantSettingViewStore;
