import { action } from 'mobx';
import { ContributionService, ContributionSettingService } from "common/data";
import { ContributionCreateForm } from 'modules/common/contribution/forms';
import { BaseContributionCreateViewStore } from 'modules/common/contribution/stores';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseContributionCreateViewStore {
    constructor(rootStore) {
        const userId = rootStore.routerStore.routerState.params.userId;
        let contributionCreate = false;

        const createViewStore = {
            name: 'contribution',
            id: undefined,
            actions: {
                create: async newContribution => {
                    let response = null;

                    if (newContribution.contributionSettingTypeId) {
                        const contributionSetting = {
                            donorAccountId: this.userId,
                            amount: newContribution.settingAmount,
                            bankAccountId: newContribution.settingBankAccountId,
                            contributionSettingTypeId: newContribution.contributionSettingTypeId,
                            startDate: newContribution.settingStartDate,
                            enabled: true,
                            lowBalanceAmount: newContribution.settingLowBalanceAmount,
                        }
                        response = await this.contributionSettingService.create(contributionSetting);
                    }
                    else {
                        response = await this.contributionService.createContribution(this.userId, newContribution);
                        contributionCreate = true;
                    }
                    return response;
                }
            },
            FormClass: ContributionCreateForm,
            // onAfterCreate: () => contributionCreate ?
            //     rootStore.routerStore.navigate('master.app.administration.contribution.list') :
            //     rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: this.userId })
        }

        const config = {};
        config.createViewStore = createViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        this.additionalActions.additionalSetFormDefaults = this.additionalSetFormDefaults;

        this.load();
    }

    @action.bound additionalSetFormDefaults() {
        this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
    }
}

export default ContributionCreateViewStore;