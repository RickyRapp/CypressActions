import { action, runInAction } from 'mobx';
import { ContributionCreateForm } from 'application/contribution/forms';
import { BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import { LookupService } from 'common/services';
import ContributionBaseViewStore from './ContributionBaseViewStore';
import moment from 'moment';

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
                        if (this.paymentTypeDropdownStore.value.abrv === 'ach' && this.contributionSettingTypeDropdownStore.value.abrv === 'one-time' &&
                            moment(resource.settingStartDate).startOf('day').isAfter(moment().startOf('day'))) {
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
                        return await service.create(resource);
                    }
                }
            },
            FormClass: ContributionCreateForm,
        });

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore()
        this.id = id;
        this.timeZone = rootStore.timeZoneStore.timeZone;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorAccount(),
                this.fetchContributionSettingTypes()
            ]);

            this.form.$('contributionSettingTypeId').set(_.find(this.contributionSettingTypeDropdownStore.items, { abrv: 'one-time' }).id);
            this.contributionSettingTypeDropdownStore.setValue(_.find(this.contributionSettingTypeDropdownStore.items, { abrv: 'one-time' }));
            this.form.$('settingStartDate').set(moment().tz(this.timeZone).toDate())

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    async fetchContributionSettingTypes() {
        this.contributionSettingTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-setting-type');
        const response = await service.getAll();
        runInAction(() => {
            this.contributionSettingTypeDropdownStore.setItems(response.data);
            this.contributionSettingTypeDropdownStore.setLoading(false);
        });
    }
}

export default ContributionCreateViewStore;
