import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAccountAutomaticContributionSettingForm } from 'application/donor-account/forms';
import { action } from 'mobx';
import { DonorAccountService, DonorAccountBankAccountService } from '../services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountAutomaticContributionSettingViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'automatic-contribution-setting',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await service.createAutomaticContributionSetting({ donorAccountId: donorAccountId, ...resource });
                    },
                    get: async (id) => {
                        try {
                            let response = await service.getAutomaticContributionSetting(id);
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
            FormClass: DonorAccountAutomaticContributionSettingForm,
        });

        this.donorAccountId = donorAccountId;

        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const bankAccountService = new DonorAccountBankAccountService(rootStore.application.baasic.apiClient);
                    let params = {
                        donorAccountId: this.donorAccountId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const response = await bankAccountService.find(params);
                    return response.data.item;
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getResource(this.donorAccountId)
            ]);
            this.onChangeIsEnabled();
        }
    }

    @action.bound
    onChangeIsEnabled() {
        this.form.$('donorAccountBankAccountId').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('amount').set('disabled', !this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').set('disabled', !this.form.$('isEnabled').value);

        this.form.$('donorAccountBankAccountId').setRequired(this.form.$('isEnabled').value);
        this.form.$('donorAccountBankAccountId').resetValidation();
        this.form.$('amount').setRequired(this.form.$('isEnabled').value);
        this.form.$('amount').resetValidation();
        this.form.$('lowBalanceAmount').setRequired(this.form.$('isEnabled').value);
        this.form.$('lowBalanceAmount').resetValidation();
    }
}

export default DonorAccountAutomaticContributionSettingViewStore;
