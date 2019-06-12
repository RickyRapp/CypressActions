import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { ContributionCreateForm } from 'modules/common/contribution/forms';
import { BaseContributionCreateViewStore } from 'modules/common/contribution/stores';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseContributionCreateViewStore {
    constructor(rootStore) {
        const userId = rootStore.authStore.user.id;

        const createViewStore = {
            name: 'contribution',
            actions: {
                create: async item => {
                    let contributionCreate = false;
                    let response = null;

                    response = await this.contributionService.createContribution(this.userId, item)
                    this.rootStore.notificationStore.showMessageFromResponse(response);
                    contributionCreate = true;

                    if (item.makeAsRecurringPayment === true) {
                        try {
                            const contributionSetting = {
                                amount: item.settingAmount,
                                bankAccountId: item.settingBankAccountId,
                                contributionSettingTypeId: item.contributionSettingTypeId,
                                startDate: item.settingStartDate,
                                enabled: item.settingEnabled,
                                lowBalanceAmount: item.settingLowBalanceAmount,
                            }
                            const responseSetting = await this.contributionSettingService.createContributionSetting(this.userId, contributionSetting);
                            this.rootStore.notificationStore.showMessageFromResponse(responseSetting);
                        } catch (errorResponse) {
                            if (contributionCreate) {
                                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
                            }
                        }
                    }

                    this.rootStore.routerStore.navigate('master.app.main.contribution.list')
                }
            },
            FormClass: ContributionCreateForm,
            goBack: false,
            setValues: true,
            loader: true
        }

        const config = {};
        config.createViewStore = createViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.rootStore = rootStore;
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
