import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAutomaticContributionSettingForm } from 'application/donor/donor/forms';
import { action, observable } from 'mobx';
import { applicationContext } from 'core/utils';
import { toDataSourceRequestString } from '@progress/kendo-data-query';

@applicationContext
class DonorAutomaticContributionSettingViewStore extends BaseEditViewStore {
    @observable isEditEnabled = toDataSourceRequestString;

    constructor(rootStore) {
        super(rootStore, {
            name: 'automatic-contribution-setting',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await rootStore.application.donor.donorStore.createAutomaticContributionSetting({ donorId: this.donorId, ...resource });
                    },
                    get: async () => {
                        try {
                            return await rootStore.application.donor.donorStore.getAutomaticContributionSetting(this.donorId)
                        } catch (error) {
                            return null;
                        }
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource();
                this.onEnableEditClick();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorAutomaticContributionSettingForm,
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.createBankAccountDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource()
            ]);
        }
    }

    @action.bound
    onChangeIsEnabled() {
        this.form.$('donorBankAccountId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('amount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('donorBankAccountId').setRequired(this.form.$('isEnabled').value);
        this.form.$('amount').setRequired(this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').setRequired(this.form.$('isEnabled').value);
    }

    @action.bound
    async onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
        if (this.isEditEnabled) {
            this.onChangeIsEnabled();
        }
    }

    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        donorId: this.donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const data = await this.rootStore.application.donor.donorStore.findBankAccount(params);
                    return data.item;
                }
            });
    }
}

export default DonorAutomaticContributionSettingViewStore;
