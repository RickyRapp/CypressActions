import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorThirdPartyWebsiteSettingForm } from 'application/donor/forms';
import { action } from 'mobx';
import { DonorService } from '../services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorThirdPartyWebsiteSettingViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        const service = new DonorService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'third-party-website-edit',
            id: donorId,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.editThirdPartyWebsiteSetting({ id: donorId, ...resource });
                    },
                    get: async (id) => {
                        try {
                            let response = await service.getThirdPartyWebsiteSetting(id);
                            return response.data;
                        } catch (error) {
                            return null;
                        }
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource(this.donorId);
                this.onChangeIsEnabled();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorThirdPartyWebsiteSettingForm,
        });

        this.donorId = donorId;
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantPurposeTypeStore.find();
                },
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.donorId),
            ]);
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

export default DonorThirdPartyWebsiteSettingViewStore;
