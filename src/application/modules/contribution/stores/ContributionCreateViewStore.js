import { action } from 'mobx';
import { ContributionCreateForm } from 'application/contribution/forms';
import { BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import { LookupService } from 'common/services';
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

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore(
            {
                defaultItem: { id: '', name: '-' }
            },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-setting-type');
                    const response = await service.getAll();
                    return response.data;
                }
            })

        this.id = id;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount()
            ]);

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }
}

export default ContributionCreateViewStore;
