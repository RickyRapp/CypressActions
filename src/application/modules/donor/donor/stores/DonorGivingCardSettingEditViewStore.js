import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorGivingCardSettingForm } from 'application/donor/donor/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorGivingCardSettingEditViewStore extends BaseEditViewStore {
    @observable reportCard = false;
    constructor(rootStore, setting) {
        super(rootStore, {
            name: 'giving-card-setting-edit',
            id: setting && setting.id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        // if(resource.isLost || resource.isStolen) {
                        //     await 
                        // } else {
                            resource.givingCardId = this.item.givingCardId;
                            await rootStore.application.donor.donorStore.updateGivingCardSetting(resource);
                        //}
                    },
                    create: async (resource) => {
                        //resource.isEnabled = true;
                        await rootStore.application.donor.donorStore.createGivingCardSetting({ donorId: this.donorId, ...resource });
                    },
                    get: async () => {
                        return setting;
                    }
                }
            },
            FormClass: DonorGivingCardSettingForm,
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.createGrantPurposeTypeDropdownStore();
        this.createGrantAcknowledgmentTypeDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            if (this.isEdit) {
                await this.fetch([
                    this.getResource(this.id),
                ]);
                this.onChangeIsEnabled();
            }
        }
    }
    @action.bound
    toggleEdit() {
        this.form.$('isEnabled').value = !this.form.$('isEnabled').value;
        this.onChangeIsEnabled();
    }

    @action.bound
    onChangeIsEnabled() {
        this.form.$('isEnabled').value = true;

        this.form.$('grantAcknowledgmentTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxAmount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('maxTimesPerDay').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('grantAcknowledgmentTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantAcknowledgmentTypeId').resetValidation();
        this.form.$('grantPurposeTypeId').setRequired(this.form.$('isEnabled').value);
        this.form.$('grantPurposeTypeId').resetValidation();
    }

    @action.bound
    setCardAction() {
        this.reportCard = !this.reportCard;
        //this.form.$('isEnabled').value = !(this.form.$('isEnabled').value);
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

export default DonorGivingCardSettingEditViewStore;
