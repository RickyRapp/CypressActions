import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorThirdPartyWebsiteSettingForm } from 'application/administration/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorThirdPartyWebsiteSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'third-party-website-edit',
            id: rootStore.routerStore.routerState.params.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.donorStore.updateThirdPartyWebsiteSetting(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.administration.donorStore.getThirdPartyWebsiteSetting(id);
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

        this.donorId = this.id;

        this.createGrantPurposeTypeDropdownStore();
        this.createGrantAcknowledgmentTypeDropdownStore();
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

    createGrantPurposeTypeDropdownStore() {
        this.grantPurposeTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantPurposeTypeStore.find();
                },
            });
    }

    createGrantAcknowledgmentTypeDropdownStore() {
        this.grantAcknowledgmentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
                },
            });
    }
}

export default DonorThirdPartyWebsiteSettingViewStore;
