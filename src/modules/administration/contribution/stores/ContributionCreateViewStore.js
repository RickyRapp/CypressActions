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
            actions: {
                create: async item => {
                    let response = null;

                    if (item.contributionSettingTypeId) {
                        const contributionSetting = {
                            donorAccountId: this.userId,
                            amount: item.settingAmount,
                            bankAccountId: item.settingBankAccountId,
                            contributionSettingTypeId: item.contributionSettingTypeId,
                            startDate: item.settingStartDate,
                            enabled: true,
                            lowBalanceAmount: item.settingLowBalanceAmount,
                        }
                        response = await this.contributionSettingService.create(contributionSetting);
                    }
                    else {
                        response = await this.contributionService.createContribution(this.userId, item);
                        contributionCreate = true;
                    }
                    return response;
                }
            },
            FormClass: ContributionCreateForm,
            goBack: false,
            setValues: true,
            loader: true,
            onAfterCreate: () => contributionCreate ?
                rootStore.routerStore.navigate('master.app.administration.contribution.list') :
                rootStore.routerStore.navigate('master.app.administration.contribution.setting', { userId: this.userId })
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