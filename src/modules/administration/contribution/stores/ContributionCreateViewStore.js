import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { FormBase } from 'core/components';
import moment from 'moment';
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
            this.onChangeBankAccount({ id: lastBankAccount.bankAccount.id, name: lastBankAccount.bankAccount.name });
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
        const fields = contributionCreateFormFields(this.achId, this.checkId, this.chaseQuickPayId, this.stockAndMutualFundsId, this.lowBalanceAmountId, this.oneTimeId, this.everyTwoWeeksId, this.everyTwoMonthsId, this.everySixMonthsId, this.weeklyId, this.monthlyId, this.donorAccount);
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
            _.map(this.bankAccounts, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } })
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
            _.map(this.bankAccounts, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } })
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
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', donorBankAccount.bankAccount.accountHolder);
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
        params.embed = 'bankAccount,accountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        this.bankAccounts = await this.bankAccountService.getDonorAccountCollection(this.userId, params);
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

export const contributionCreateFormFields = (achId, checkId, chaseQuickPayId, stockAndMutualFundsId, lowBalanceAmountId, oneTimeId, everyTwoWeeksId, everyTwoMonthsId, everySixMonthsId, weeklyId, monthlyId, donorAccount) => [
    {
        name: 'donorAccountId',
        rules: 'required|string',
        value: donorAccount.id
    },
    {
        name: 'amount',
        label: 'CONTRIBUTIONCREATEFORM.AMOUNT',
        rules: `required|numeric|min:0`
    },
    {
        name: 'description',
        label: 'CONTRIBUTIONCREATEFORM.DESCRIPTION',
        rules: 'string',
    },
    {
        name: 'paymentTypeId',
        label: 'CONTRIBUTIONCREATEFORM.PAYMENTTYPEID',
        rules: 'required|string',
    },
    {
        name: 'bankAccountId',
        label: 'CONTRIBUTIONCREATEFORM.BANKACCOUNTID',
        rules: `required_if:paymentTypeId,${achId}|string`,
    },
    {
        name: 'checkNumber',
        label: 'CONTRIBUTIONCREATEFORM.CHECKNUMBER',
        rules: `required_if:paymentTypeId,${checkId}|string`,
    },
    {
        name: 'payerInformation',
        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION',
        fields: [
            {
                name: 'firstName',
                label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.FIRSTNAME',
                rules: 'required|string',
                value: donorAccount.coreUser.firstName
            },
            {
                name: 'lastName',
                label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.LASTNAME',
                rules: 'required|string',
                value: donorAccount.coreUser.lastName
            },
            {
                name: 'address',
                label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS',
                fields: [
                    {
                        name: 'addressLine1',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine1
                    },
                    {
                        name: 'addressLine2',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2',
                        rules: 'string',
                        value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine2
                    },
                    {
                        name: 'city',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.CITY',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.city
                    },
                    {
                        name: 'state',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.STATE',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.state
                    },
                    {
                        name: 'zipCode',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.ADDRESS.ZIPCODE',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.zipCode
                    },
                ]
            },
            {
                name: 'emailAddress',
                label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS',
                fields: [
                    {
                        name: 'email',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress.email
                    },
                ]
            },
            {
                name: 'phoneNumber',
                label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER',
                fields: [
                    {
                        name: 'number',
                        label: 'CONTRIBUTIONCREATEFORM.PAYERINFORMATION.PHONENUMBER.NUMBER',
                        rules: 'required|string',
                        value: _.find(donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber.number
                    },
                ]
            },
        ]
    },
    {
        name: 'financialInstitution',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTION',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
    },
    {
        name: 'financialInstitutionAddressLine1',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE1',
        rules: `string`,
    },
    {
        name: 'financialInstitutionAddressLine2',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONADDRESSLINE2',
        rules: 'string'
    },
    {
        name: 'financialInstitutionCity',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONCITY',
        rules: `string`
    },
    {
        name: 'financialInstitutionState',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONSTATE',
        rules: `string`
    },
    {
        name: 'financialInstitutionZipCode',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONZIPCODE',
        rules: `string`
    },
    {
        name: 'financialInstitutionPhoneNumber',
        label: 'CONTRIBUTIONCREATEFORM.FINANCIALINSTITUTIONPHONENUMBER',
        rules: `string`
    },
    {
        name: 'accountNumber',
        label: 'CONTRIBUTIONCREATEFORM.ACCOUNTNUMBER',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
    },
    {
        name: 'securityType',
        label: 'CONTRIBUTIONCREATEFORM.SECURITYTYPE',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
    },
    {
        name: 'securitySymbol',
        label: 'CONTRIBUTIONCREATEFORM.SECURITYSYMBOL',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`
    },
    {
        name: 'numberOfShares',
        label: 'CONTRIBUTIONCREATEFORM.NUMBEROFSHARES',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:0`
    },
    {
        name: 'estimatedValue',
        label: 'CONTRIBUTIONCREATEFORM.ESTIMATEDVALUE',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:10000`
    },
    {
        name: 'transactionId',
        label: 'CONTRIBUTIONCREATEFORM.TRANSACTIONID',
        rules: `required_if:paymentTypeId,${chaseQuickPayId}|string`
    },
    {
        name: 'memo',
        label: 'CONTRIBUTIONCREATEFORM.MEMO',
        rules: 'string'
    },
    {
        name: 'makeAsRecurringPayment',
        label: 'CONTRIBUTIONCREATEFORM.MAKEASRECURRINGPAYMENT',
        rules: 'boolean',
        value: false,
        type: 'checkbox'
    },
    {
        name: 'settingAmount',
        label: 'CONTRIBUTIONCREATEFORM.SETTINGAMOUNT',
        rules: 'required_if:makeAsRecurringPayment,true|string'
    },
    {
        name: 'settingBankAccountId',
        label: 'CONTRIBUTIONCREATEFORM.SETTINGBANKACCOUNTID',
        rules: 'required_if:makeAsRecurringPayment,true|string'
    },
    {
        name: 'contributionSettingTypeId',
        label: 'CONTRIBUTIONCREATEFORM.CONTRIBUTIONSETTINGTYPEID',
        rules: 'required_if:makeAsRecurringPayment,true|string'
    },
    {
        name: 'settingEnabled',
        label: 'CONTRIBUTIONCREATEFORM.SETTINGENABLED',
        rules: 'boolean',
        value: false,
        type: 'checkbox'
    },
    {
        name: 'settingStartDate',
        label: 'CONTRIBUTIONCREATEFORM.SETTINGSTARTDATE',
        rules: `required_if:contributionSettingTypeId,${oneTimeId}|required_if:contributionSettingTypeId,${weeklyId}|required_if:contributionSettingTypeId,${monthlyId}|required_if:contributionSettingTypeId,${everyTwoWeeksId}|required_if:contributionSettingTypeId,${everyTwoMonthsId}|required_if:contributionSettingTypeId,${everySixMonthsId}|date|after_override:' + ${moment(new Date).add(1, 'days').format('MM/DD/YYYY')}`
    },
    {
        name: 'settingLowBalanceAmount',
        label: 'CONTRIBUTIONCREATEFORM.SETTINGLOWBALANCEAMOUNT',
        rules: `required_if:contributionSettingTypeId,${lowBalanceAmountId}|string`
    }
]