import { action, observable } from 'mobx';
import { ContributionSettingService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class BaseContributionSettingCreateEditViewStore extends BaseEditViewStore {
    @observable contributionSettingType = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore, config) {
        super(rootStore, config.editCreateViewStore)

        this.contributionSettingType = config.contributionSettingType;
        this.bankAccounts = config.bankAccounts;
        this.userId = config.userId;
        if (!config.id) {
            this.form.$('donorAccountId').set('value', config.userId);
        }
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
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => option ? this.form.$('bankAccountId').set('value', option.id) : this.form.$('bankAccountId').clear()
            },
            _.map(this.bankAccounts, e => { return { id: e.id, name: e.name } })
        );

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Setting',
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

export default BaseContributionSettingCreateEditViewStore;