import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorAutomaticContributionSettingForm } from 'application/donor/forms';
import { action } from 'mobx';
import { DonorService, DonorBankAccountService } from '../services';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAutomaticContributionSettingViewStore extends BaseEditViewStore {
    constructor(rootStore, donorId) {
        const service = new DonorService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'automatic-contribution-setting',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await service.createAutomaticContributionSetting({ donorId: donorId, ...resource });
                    },
                    get: async () => {
                        const response = await service.getAutomaticContributionSetting(donorId);
                        return response.data;
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

        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
                    let params = {
                        donorId: donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const response = await bankAccountService.find({ userId: donorId, ...params });
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
}

export default DonorAutomaticContributionSettingViewStore;
