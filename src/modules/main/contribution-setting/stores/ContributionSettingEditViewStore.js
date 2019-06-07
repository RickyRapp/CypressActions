import { action, observable, computed } from 'mobx';
import { ContributionSettingEditForm } from 'modules/main/contribution-setting/forms';
import { ContributionSettingService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class ContributionSettingEditViewStore extends BaseEditViewStore {
    @observable contributionSettingType = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore, item, onAfterUpdate, bankAccounts, contributionSettingType) {
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.userId;

        super(rootStore, {
            name: 'contribution setting',
            id: item.id,
            actions: {
                update: async contributionSetting => {
                    try {
                        return await contributionSettingService.updateContributionSetting(userId, contributionSetting);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                },
                get: () => {
                    return item;
                }
            },
            FormClass: ContributionSettingEditForm,
            autoInit: false,
            onAfterUpdate: onAfterUpdate,
            goBack: false
        });

        this.userId = userId;
        this.bankAccounts = bankAccounts;
        this.contributionSettingType = contributionSettingType;
        this.load();
    }

    @action.bound async load() {
        await this.initialize();
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
            _.map(this.bankAccounts, e => { return { id: e.id, name: e.name } })
        );
        this.bankAccountDropdownStore.value = this.form.$('bankAccountId').value;
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
        }
        else {
            this.form.$('bankAccountId').clear();
        }
    }
}

export default ContributionSettingEditViewStore;