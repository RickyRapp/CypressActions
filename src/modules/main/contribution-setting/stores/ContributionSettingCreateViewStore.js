import { action, observable } from 'mobx';
import { ContributionSettingCreateForm } from 'modules/main/contribution-setting/forms';
import { ContributionSettingService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class ContributionSettingCreateViewStore extends BaseEditViewStore {
    @observable contributionSettingType = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore, onAfterCreate, bankAccounts, contributionSettingType) {
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.userId;

        super(rootStore, {
            name: 'contribution setting',
            actions: {
                create: async contributionSetting => {
                    try {
                        return await contributionSettingService.createContributionSetting(userId, contributionSetting);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                }
            },
            FormClass: ContributionSettingCreateForm,
            onAfterCreate: onAfterCreate,
            goBack: false,
            autoInit: false
        });

        this.contributionSettingType = contributionSettingType;
        this.bankAccounts = bankAccounts;
        this.userId = userId;
        this.load();
    }

    @action.bound async load() {
        await this.setStores();
    }

    @action.bound async setStores() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                name: 'BankAccount',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: this.onChangeBankAccount
            },
            _.map(this.bankAccounts, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } })
        );

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Setting',
                name: 'ContributionSettingTypeId',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: this.onChangeContributionSetting
            },
            this.contributionSettingType
        );
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
        }
        else {
            this.form.$('bankAccountId').clear();
        }
    }

    @action.bound async onChangeContributionSetting(option) {
        if (option && option.id) {
            this.form.$('contributionSettingTypeId').set('value', option.id);
            if (option.abrv === 'low-balance') {
                this.form.$('lowBalanceAmount').set('rules', 'required|numeric');
                this.form.$('startDate').set('rules', 'date');
            }
            else {
                this.form.$('lowBalanceAmount').set('rules', 'numeric');
                this.form.$('startDate').set('rules', 'required|date');
            }
        }
        else {
            this.form.$('contributionSettingTypeId').clear();
        }
    }
}

export default ContributionSettingCreateViewStore;