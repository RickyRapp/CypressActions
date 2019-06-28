import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { ContributionCreateForm } from 'modules/common/contribution/forms';
import { BaseContributionCreateViewStore } from 'modules/common/contribution/stores';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseContributionCreateViewStore {
    constructor(rootStore) {
        const userId = rootStore.authStore.user.id;
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
                rootStore.routerStore.navigate('master.app.main.contribution.list') :
                rootStore.routerStore.navigate('master.app.main.contribution.setting')
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
        this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${this.donorAccount.initialContribution ? this.donorAccount.contributionMinimumAdditional : this.donorAccount.contributionMinimumInitial}`);
    }
}

export default ContributionCreateViewStore;
