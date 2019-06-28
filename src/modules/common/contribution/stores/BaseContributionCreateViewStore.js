import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class BaseContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionSettingType = null;
    @observable contributionStatuses = null;
    @observable usedSettingTypeIds = null;

    additionalActions = {};

    constructor(rootStore, config) {
        super(rootStore, config.createViewStore);

        this.rootStore = rootStore;
        this.userId = config.userId;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);

        this.addBankAccountModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAddBankAccount = async () => {
            this.addBankAccountModalParams.close();
            await this.getBankAccounts();
            this.setStores();
            let lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.onChangeBankAccount({ id: lastBankAccount.id, name: lastBankAccount.name });
        }
    }

    @action.bound async load() {
        await this.fetch([
            this.loadLookups(),
            this.getDonorAccount(),
            this.getBankAccounts()
        ]);

        await this.setFormDefaults();
        if (this.additionalActions) {
            if (_.isFunction(this.additionalActions.additionalSetFormDefaults)) {
                this.additionalActions.additionalSetFormDefaults();
            }
        }

        this.setStores();
        this.form.$('payerInformation').each(field => field.set('disabled', this.form.$('bankAccountId').value && this.form.$('bankAccountId').value !== ''));
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

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber,contributionSettings'];
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound async getBankAccounts() {
        let params = {};
        params.embed = 'bankAccount,thirdPartyAccountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        params.donorAccountId = this.userId;
        const response = await this.bankAccountService.find(params);
        this.bankAccounts = response.item;
    }

    @action.bound async syncBankAccounts() {
        await this.getBankAccounts();
        let selectedBankAccount = _.find(this.bankAccounts, { id: this.form.$('bankAccountId').value });
        if (selectedBankAccount)
            this.onChangeBankAccount({ id: selectedBankAccount.id, name: selectedBankAccount.name });
        this.rootStore.notificationStore.success('Bank Accounts Synced.');
    }

    @action.bound setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
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
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: this.onChangeBankAccount
            },
            _.map(this.bankAccounts, e => { return { id: e.id, name: e.name } })
        );

        this.bankAccountSettingDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: (option) => this.form.$('settingBankAccountId').set('value', option ? option.id : null)
            },
            _.map(this.bankAccounts, e => { return { id: e.id, name: e.name } })
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

    @action.bound setFormDefaults() {
        if (this.donorAccount) {
            //Rules
            this.form.$('bankAccountId').set('rules', this.form.$('bankAccountId').rules + `|required_if:paymentTypeId,${this.achId}`);
            this.form.$('checkNumber').set('rules', this.form.$('checkNumber').rules + `|required_if:paymentTypeId,${this.checkId}`);
            this.form.$('financialInstitution').set('rules', this.form.$('financialInstitution').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('accountNumber').set('rules', this.form.$('accountNumber').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('securityType').set('rules', this.form.$('securityType').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('securitySymbol').set('rules', this.form.$('securitySymbol').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('numberOfShares').set('rules', this.form.$('numberOfShares').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('estimatedValue').set('rules', this.form.$('estimatedValue').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('transactionId').set('rules', this.form.$('transactionId').rules + `|required_if:paymentTypeId,${this.chaseQuickPayId}`);
            this.form.$('settingStartDate').set('rules', this.form.$('settingStartDate').rules + `|required_if:contributionSettingTypeId,${this.oneTimeId}|required_if:contributionSettingTypeId,${this.weeklyId}|required_if:contributionSettingTypeId,${this.monthlyId}|required_if:contributionSettingTypeId,${this.everyTwoWeeksId}|required_if:contributionSettingTypeId,${this.everyTwoMonthsId}|required_if:contributionSettingTypeId,${this.everySixMonthsId}`);

            //Default Values
            this.form.$('payerInformation.firstName').set('default', this.donorAccount.coreUser.firstName);
            this.form.$('payerInformation.lastName').set('default', this.donorAccount.coreUser.lastName);
            this.form.$('payerInformation.address').set('default', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
            this.form.$('payerInformation.emailAddress').set('default', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('default', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);

            //Values
            this.form.$('donorAccountId').set('value', this.donorAccount.id);
            this.form.$('payerInformation.firstName').set('value', this.donorAccount.coreUser.firstName);
            this.form.$('payerInformation.lastName').set('value', this.donorAccount.coreUser.lastName);
            this.form.$('payerInformation.address').set('value', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
            this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);
        }
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        this.form.$('bankAccountId').clear();
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.id === option.id) });
            this.form.$('payerInformation').each(field => field.reset());
            this.form.$('payerInformation').set('value', donorBankAccount.thirdPartyAccountHolder);
            this.form.$('payerInformation').each(field => { field.set('disabled', true) });
        }
        else {
            this.form.$('bankAccountId').clear();
            this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        }
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async onChangeContributionSetting(option) {
        this.form.$('contributionSettingTypeId').set('value', option ? option.id : null);

        this.form.$('settingBankAccountId').set('value', this.form.$('bankAccountId').value);
        this.form.$('settingAmount').set('value', this.form.$('amount').value);
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

export default BaseContributionCreateViewStore;