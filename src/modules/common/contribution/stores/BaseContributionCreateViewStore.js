import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { getDonorName } from 'core/utils';
import _ from 'lodash';

class BaseContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
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
            await this.fetchBankAccounts();
            const lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.bankAccountDropdownStore.onChange({ id: lastBankAccount.id, name: lastBankAccount.name });
        }

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: this.onChangePaymentType
            });
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: this.onChangeBankAccount
            });
        this.bankAccountSettingDropdownStore = new BaasicDropdownStore();
        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: this.onChangeContributionSetting
            });

        this.fetch([
            this.fetchPaymentTypes(),
            this.fetchBankAccounts()
        ]);
    }

    @action.bound async load() {
        await this.fetch([
            this.getDonorAccount()
        ]);

        await this.setFormDefaults();
        if (this.additionalActions) {
            if (_.isFunction(this.additionalActions.additionalSetFormDefaults)) {
                this.additionalActions.additionalSetFormDefaults();
            }
        }

        this.fetchContributionSettings();
        this.form.$('payerInformation').each(field => field.set('disabled', this.form.$('bankAccountId').value && this.form.$('bankAccountId').value !== ''));
    }

    @action.bound async loadLookups() {
        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async getDonorAccount() {
        let params = {};
        params.embed = [
            'coreUser',
            'companyProfile',
            'donorAccountAddresses',
            'donorAccountAddresses.address',
            'donorAccountEmailAddresses',
            'donorAccountEmailAddresses.emailAddress',
            'donorAccountPhoneNumbers',
            'donorAccountPhoneNumbers.phoneNumber',
            'contributionSettings'
        ];
        params.fields = [
            'id',
            'donorName',
            'initialContribution',
            'contributionMinimumAdditional',
            'contributionMinimumInitial',
            'donorAccountAddresses',
            'donorAccountEmailAddresses',
            'donorAccountPhoneNumbers',
            'contributionSettings'
        ]
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound async syncBankAccounts() {
        await this.fetchBankAccounts();
        let selectedBankAccount = _.find(this.bankAccounts, { id: this.form.$('bankAccountId').value });
        if (selectedBankAccount)
            this.onChangeBankAccount({ id: selectedBankAccount.id, name: selectedBankAccount.name });
        this.rootStore.notificationStore.success('Bank Accounts Synced.');
    }

    @action async fetchPaymentTypes() {
        this.paymentTypeDropdownStore.setLoading(true);
        const paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let paymentTypesModels = await paymentTypeLookupService.getAll();
        this.paymentTypes = paymentTypesModels.data;
        this.paymentTypeDropdownStore.setItems(this.paymentTypes);
        this.paymentTypeDropdownStore.setLoading(false);
    }

    @action async fetchBankAccounts() {
        this.bankAccountDropdownStore.setLoading(true);
        let params = {
            embed: ['thirdPartyAccountHolder', 'thirdPartyAccountHolder.address', 'thirdPartyAccountHolder.emailAddress', 'thirdPartyAccountHolder.phoneNumber'],
            orderBy: 'dateCreated',
            orderDirection: 'asc',
            donorAccountId: this.userId
        }
        const response = await this.bankAccountService.find(params);
        this.bankAccounts = response.item;
        this.bankAccountDropdownStore.setItems(this.bankAccounts);
        this.bankAccountSettingDropdownStore.setItems(this.bankAccounts);
        this.bankAccountDropdownStore.setLoading(false);
    }

    @action async fetchContributionSettings() {
        this.contributionSettingTypeDropdownStore.setLoading(true);
        const contributionSettingTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-setting-type');
        let contributionSettingTypeModels = await contributionSettingTypeLookupService.getAll();
        _.remove(contributionSettingTypeModels.data, function (item) { return item.abrv === 'low-balance' });
        this.contributionSettingType = contributionSettingTypeModels.data;

        let availableContributionSettingType = [];
        if (this.donorAccount.contributionSettings) {
            this.usedSettingTypes = _.map(this.donorAccount.contributionSettings, function (x) { return { id: x.contributionSettingTypeId, name: x.contributionSettingType.name } });
            const usedSettingTypeIds = this.usedSettingTypeIds;
            _.forEach(this.contributionSettingType, function (x) {
                if (!_.includes(usedSettingTypeIds, x.id)) {
                    availableContributionSettingType.push(x);
                }
            });
        }
        else {
            availableContributionSettingType.concat(this.contributionSettingType);
        }
        this.contributionSettingTypeDropdownStore.setItems(availableContributionSettingType);
        this.contributionSettingTypeDropdownStore.setLoading(false);
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
            this.form.$('payerInformation.name').set('default', this.donorAccount.donorName);
            this.form.$('payerInformation.address').set('default', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
            this.form.$('payerInformation.emailAddress').set('default', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('default', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);

            //Values
            this.form.$('donorAccountId').set('value', this.donorAccount.id);
            this.form.$('payerInformation.name').set('value', this.donorAccount.donorName);
            this.form.$('payerInformation.address').set('value', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
            this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);
        }
    }

    @action.bound async onChangePaymentType(option) {
        this.form.$('checkNumber').clear();
        this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        this.form.$('bankAccountId').clear();
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.id === option.id) });
            this.form.$('payerInformation').each(field => field.reset());
            this.form.$('payerInformation').set('value', donorBankAccount.thirdPartyAccountHolder);
            this.form.$('payerInformation').each(field => { field.set('disabled', true) });
        }
        else {
            this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        }
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async onChangeContributionSetting(option) {
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