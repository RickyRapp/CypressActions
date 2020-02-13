import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAccountThirdPartyWebsiteSettingForm } from 'application/donor-account/forms';
import { action } from 'mobx';
import { DonorAccountService } from '../services';
import { LookupService } from 'common/services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountThirdPartyWebsiteSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'third-party-website-edit',
            id: donorAccountId,
            actions: () => {
                return {
                    update: async (resource) => {
                        await service.editThirdPartyWebsiteSetting({ id: donorAccountId, ...resource });
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
                await this.getResource(this.donorAccountId);
                this.onChangeIsEnabled();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorAccountThirdPartyWebsiteSettingForm,
        });

        this.donorAccountId = donorAccountId;
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
                    const response = await service.getAll();
                    return response.data;
                },
            });
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
                    const response = await service.getAll();
                    return response.data;
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
                this.getResource(this.donorAccountId),
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

export default DonorAccountThirdPartyWebsiteSettingViewStore;
