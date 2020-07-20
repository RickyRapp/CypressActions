import { action, runInAction } from 'mobx';
import { ContributionCreateForm } from 'application/contribution/forms';
import { BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import { LookupService } from 'common/services';
import ContributionBaseViewStore from './ContributionBaseViewStore';
import moment from 'moment';
import _ from 'lodash'
import { DonorContributionSettingService } from 'application/donor/services';

@applicationContext
class ContributionCreateViewStore extends ContributionBaseViewStore {
    constructor(rootStore) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'contribution-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {
                        if (this.paymentTypeDropdownStore.value.abrv === 'ach' &&
                            !(this.contributionSettingTypeDropdownStore.value.abrv === 'one-time' &&
                                moment(resource.settingStartDate).startOf('day').isSame(moment().startOf('day')))) {

                            const contributionSettingService = new DonorContributionSettingService(rootStore.application.baasic.apiClient);
                            const contributionSetting = {
                                donorId: resource.donorId,
                                amount: resource.amount,
                                donorBankAccountId: resource.bankAccountId,
                                contributionSettingTypeId: resource.contributionSettingTypeId,
                                startDate: resource.settingStartDate,
                                isEnabled: true
                            }
                            return await contributionSettingService.create(contributionSetting);
                        }
                        return await service.create(resource);
                    }
                }
            },
            FormClass: ContributionCreateForm
        });

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore()
        this.donorId = rootStore.routerStore.routerState.params.id;
        this.timeZone = rootStore.timeZoneStore.timeZone;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.fetchContributionSettingTypes()
            ]);

            this.form.$('contributionSettingTypeId').set(_.find(this.contributionSettingTypeDropdownStore.items, { abrv: 'one-time' }).id);
            this.contributionSettingTypeDropdownStore.setValue(_.find(this.contributionSettingTypeDropdownStore.items, { abrv: 'one-time' }));
            // this.form.$('settingStartDate').set(moment().tz(this.timeZone).toDate())

            await this.fetch([
                this.setFormDefaultRules(),
                this.setFormDefaultValues()
            ]);
            this.form.$('settingStartDate').set(moment().toDate());
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
