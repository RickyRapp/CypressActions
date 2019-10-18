import { action, runInAction } from 'mobx';
import { ContributionCreateForm } from 'application/contribution/forms';
import { BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import { LookupService } from 'common/services';
import _ from 'lodash';
import ContributionBaseViewStore from './ContributionBaseViewStore';

@applicationContext
class ContributionCreateViewStore extends ContributionBaseViewStore {
    constructor(rootStore) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'contribution-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        if (resource.contributionSettingTypeId && resource.settingStartDate) {
                            const contributionSetting = {
                                donorAccountId: id,
                                amount: resource.amount,
                                bankAccountId: resource.bankAccountId,
                                contributionSettingTypeId: resource.contributionSettingTypeId,
                                startDate: resource.settingStartDate,
                                enabled: true
                            }
                            return await service.createSetting(contributionSetting);
                        }
                        else {
                            return await service.create(resource);
                        }
                    }
                }
            },
            FormClass: ContributionCreateForm,
        });

        debugger
        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore({
            defaultItem: { id: '', name: '-' }
        })
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchPaymentTypes(),
                this.fetchBankAccounts(),
                this.fetchContributionSettingTypes()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    async fetchContributionSettingTypes() {
        debugger
        this.contributionSettingTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-setting-type');
        const response = await service.getAll();
        runInAction(() => {
            this.contributionSettingTypeDropdownStore.setItems(_.filter(response.data, function (type) { return type.abrv !== 'low-balance' }));
            this.contributionSettingTypeDropdownStore.setLoading(false);
        });
    }
}

export default ContributionCreateViewStore;
