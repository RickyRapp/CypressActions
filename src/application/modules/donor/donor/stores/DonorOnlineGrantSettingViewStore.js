import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorOnlineGrantSettingForm } from 'application/donor/donor/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorOnlineGrantSettingViewStore extends BaseEditViewStore {
     @observable microGiving = false;
    constructor(rootStore) {
        super(rootStore, {
            name: 'third-party-website-edit',
            id: rootStore.userStore.applicationUser.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        debugger;
                        await rootStore.application.donor.donorStore.updateOnlineGrantSetting(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.donor.donorStore.getThirdPartyWebsiteSetting(id);
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource(this.donorId);
                this.onChangeIsEnabled();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorOnlineGrantSettingForm,
        });

        this.donorId = this.id;

    }

    @action.bound
    setMicroGiving(){
        this.microGiving = !this.microGiving;
    }

    @action.bound
    async onInit({ initialLoad }) {
        this.form.$('isEnabled').value = true;
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.donorId),
            ]);
            this.form.$('isEnabled').value = true;
            this.onChangeIsEnabled();
        }
    }

    @action.bound
    onChangeIsEnabled() {
        this.form.$('grantAcknowledgmentTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxAmount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxTimesPerDay').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('grantAcknowledgmentTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantAcknowledgmentTypeId').resetValidation();
        this.form.$('grantPurposeTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').resetValidation();
    }

}

export default DonorOnlineGrantSettingViewStore;
