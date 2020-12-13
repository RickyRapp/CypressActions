import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAutomaticContributionSettingForm } from 'application/administration/donor/forms';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAutomaticContributionSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'automatic-contribution-setting',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await rootStore.application.administration.donorStore.createAutomaticContributionSetting({ donorId: this.donorId, ...resource });
                    },
                    get: async () => {
                        return rootStore.application.administration.donorStore.getAutomaticContributionSetting(this.donorId);
                    }
                }
            },
            onAfterAction: async () => {
                await this.getResource();
                this.onChangeIsEnabled();
                rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE')
            },
            FormClass: DonorAutomaticContributionSettingForm,
        });

        this.donorId = rootStore.routerStore.routerState.params.id;

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
            this.onChangeIsEnabled();
        }
    }

    @action.bound
    async onChangeIsEnabled() {
        this.form.$('donorBankAccountId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('amount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('donorBankAccountId').setRequired(this.form.$('isEnabled').value);
        this.form.$('amount').setRequired(this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').setRequired(this.form.$('isEnabled').value);
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
                    const data = await this.rootStore.application.administration.donorStore.findBankAccount(params);
                    return data.item;
                }
            });
    }
}

export default DonorAutomaticContributionSettingViewStore;
