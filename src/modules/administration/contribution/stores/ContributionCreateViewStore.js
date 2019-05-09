import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { FormBase } from 'core/components';
import { ContributionCreateFormFields } from 'modules/common/contribution/forms';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionSettingType = null;
    @observable contributionStatuses = null;
    @observable usedSettingTypeIds = null;
    @observable form = null;

    constructor(rootStore) {
        super(rootStore);

        this.rootStore = rootStore;
        this.userId = rootStore.routerStore.routerState.params.userId;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        this.addBankAccountModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAddBankAccount = async () => {
            this.addBankAccountModalParams.close();
            await this.getBankAccounts();
            await this.setStores();
            let lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.onChangeBankAccount({ id: lastBankAccount.id, name: lastBankAccount.name });
        }

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.getDonorAccount();
        await this.initializeForm();
        await this.getBankAccounts();
        await this.setStores();
    }

    @action.bound async initializeForm() {
        const fields = ContributionCreateFormFields(this.achId, this.checkId, this.chaseQuickPayId, this.stockAndMutualFundsId, this.lowBalanceAmountId, this.oneTimeId, this.everyTwoWeeksId, this.everyTwoMonthsId, this.everySixMonthsId, this.weeklyId, this.monthlyId, 0, this.donorAccount);
        this.form = new FormBase({
            onSuccess: async (form) => {
                const item = form.values();
                let contributionCreate = false;
                let response = null;
                try {
                    response = await this.contributionService.createContribution(this.userId, item)
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    contributionCreate = true;

                    if (form.$('makeAsRecurringPayment').value === true) {
                        const contributionSetting = {
                            amount: this.form.$('settingAmount').value,
                            bankAccountId: this.form.$('settingBankAccountId').value,
                            contributionSettingTypeId: this.form.$('contributionSettingTypeId').value,
                            startDate: this.form.$('settingStartDate').value,
                            enabled: this.form.$('settingEnabled').value,
                            lowBalanceAmount: this.form.$('settingLowBalanceAmount').value,
                        }
                        const responseSetting = await this.contributionSettingService.createContributionSetting(this.userId, contributionSetting);
                        this.rootStore.notificationStore.showMessageFromResponse(responseSetting, 6000);
                    }

                    this.rootStore.routerStore.navigate('master.app.administration.contribution.list')
                } catch (errorResponse) {
                    if (contributionCreate) {
                        this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                    }
                }
            }
        }, fields);
        this.form.$('bankAccountId').observe(({ form, field, change }) => { form.$('payerInformation').each(field => field.set('disabled', form.$('bankAccountId').value !== '')) })
    }

    @action.bound async setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
                name: 'PaymentType',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: this.onChangePaymentType
            },
            this.paymentTypes
        );

        this.bankAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                name: 'BankAccount',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: this.onChangeBankAccount
            },
            _.map(this.bankAccounts, e => { return { 'id': e.id, 'name': e.name } })
        );

        this.bankAccountSettingDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                name: 'BankAccount',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: this.onChangeSettingBankAccount
            },
            _.map(this.bankAccounts, e => { return { 'id': e.id, 'name': e.name } })
        );

        let availableContributionSettingType = [];
        if (this.donorAccount.contributionSettings) {
            this.usedSettingTypeIds = _.map(this.donorAccount.contributionSettings, function (x) { return x.contributionSettingTypeId; });
            let usedSettingTypeIds = this.usedSettingTypeIds;
            _.forEach(this.contributionSettingType, function (x) {
                if (!_.includes(usedSettingTypeIds, x.id)) {
                    availableContributionSettingType.push(x);
                }
            });
        }

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
            availableContributionSettingType
        );
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('bankAccountId').clear();
        this.form.$('payerInformation').reset();
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let bankAccount = _.find(this.bankAccounts, function (bankAccount) { return (bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', bankAccount.thirdPartyAccountHolder);
        }
        else {
            this.form.$('bankAccountId').clear();
            if (this.form.$('paymentTypeId').value === this.wireTransferId) {
                this.form.$('payerInformation').reset();
            }
        }
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async onChangeMakeAsRecurringPayment(event) {
        this.form.$('makeAsRecurringPayment').set('value', event.target.checked);

        if (this.form.$('makeAsRecurringPayment').value === true) {
            this.form.$('settingBankAccountId').set('value', this.form.$('bankAccountId').value);
            this.form.$('settingAmount').set('value', this.form.$('amount').value);
        }
    }

    @action.bound async onChangeSettingBankAccount(option) {
        this.form.$('settingBankAccountId').set('value', option ? option.id : null);
    }

    @action.bound async onChangeContributionSetting(option) {
        this.form.$('contributionSettingTypeId').set('value', option ? option.id : null);
    }

    @action.bound async getDonorAccount() {
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber,contributionSettings'];
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound async getBankAccounts() {
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = 'bankAccount,thirdPartyAccountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        params.donorAccountId = this.userId;
        const response = await this.bankAccountService.find(params);
        this.bankAccounts = response.item;
    }

    @action.bound async loadLookups() {
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let paymentTypesModels = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(paymentTypesModels.data, ['sortOrder'], ['asc']);

        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);

        let contributionSettingTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-setting-type');
        let contributionSettingTypeModels = await contributionSettingTypeLookupService.getAll();
        this.contributionSettingType = _.orderBy(contributionSettingTypeModels.data, ['sortOrder'], ['asc']);
    }

    @computed get pendingId() {
        return this.contributionStatuses ? _.find(this.contributionStatuses, { abrv: 'pending' }).id : null;
    }

    @computed get inProcessId() {
        return this.contributionStatuses ? _.find(this.contributionStatuses, { abrv: 'in-process' }).id : null;
    }

    @computed get achId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'ach' }).id : null;
    }

    @computed get wireTransferId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id : null;
    }

    @computed get chaseQuickPayId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'chase-quickpay' }).id : null;
    }

    @computed get stockAndMutualFundsId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'stock-and-mutual-funds' }).id : null;
    }

    @computed get checkId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'check' }).id : null;
    }

    @computed get lowBalanceAmountId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'low-balance' }).id : null;
    }

    @computed get oneTimeId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'one-time' }).id : null;
    }

    @computed get everyTwoWeeksId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'every-two-weeks' }).id : null;
    }

    @computed get everyTwoMonthsId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'every-two-months' }).id : null;
    }

    @computed get everySixMonthsId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'every-six-months' }).id : null;
    }

    @computed get weeklyId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'weekly' }).id : null;
    }

    @computed get monthlyId() {
        return this.contributionSettingType ? _.find(this.contributionSettingType, { abrv: 'monthly' }).id : null;
    }
}

export default ContributionCreateViewStore;