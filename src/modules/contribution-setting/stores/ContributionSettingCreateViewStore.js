import { action, observable, computed } from 'mobx';
import { ContributionSettingCreateForm } from 'modules/contribution-setting/forms';
import { ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class ContributionSettingCreateViewStore extends BaseEditViewStore {
    @observable contributionSettingType = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore, onAfterCreate, bankAccounts, contributionSettingType) {
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id;

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
                isClearable: false
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
            }
            else {
                this.form.$('startDate').set('rules', 'required|date');
            }
        }
        else {
            this.form.$('contributionSettingTypeId').clear();
        }
    }

    @action.bound async getBankAccounts() {
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = 'bankAccount'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        return await this.bankAccountService.getDonorAccountCollection(this.userId, params);
    }
}

export default ContributionSettingCreateViewStore;