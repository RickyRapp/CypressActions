import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { FormBase } from 'core/components';
import moment from 'moment';
import _ from 'lodash';

class ContributionEditViewStore extends BaseViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionStatuses = null;
    @observable form = null;
    contribution = null;

    constructor(rootStore) {
        super(rootStore);

        this.rootStore = rootStore;
        this.contributionId = rootStore.routerStore.routerState.params.id;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        this.addBankAccountModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewContributionModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAddBankAccount = async () => {
            this.addBankAccountModalParams.close();
            await this.getBankAccounts();
            await this.setStores();
            let lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.onChangeBankAccount({ id: lastBankAccount.bankAccount.id, name: lastBankAccount.bankAccount.name });
        }

        this.onAfterReviewContribution = async (val) => {
            this.reviewContributionModalParams.close();
            this.rootStore.routerStore.navigate('master.app.administration.contribution.list')
        }

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.initialize();
        if (!(this.contribution.contributionStatusId === this.pendingId || this.contribution.contributionStatusId === this.inProcessId)) {
            this.rootStore.routerStore.navigate('master.app.administration.contribution.list')
            this.rootStore.notificationStore.warning('Contribution Can be Edited Only In Pending Or In Process Status.', 6000);
        }
        await this.getDonorAccount();
        await this.initializeForm();
        await this.getBankAccounts();
        await this.setStores();
        this.form.$('payerInformation').each(field => field.set('disabled', this.form.$('bankAccountId').value !== ''))
    }

    @action.bound async initialize() {
        let params = {};
        params.embed = ['payerInformation,address,emailAddress,phoneNumber,paymentType,bankAccount,createdByCoreUser,contributionStatus'];
        let model = await this.contributionService.get(this.contributionId, params);
        if (model.json && JSON.parse(model.json).paymentTypeInformations) {
            _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                model[key] = value;
            });
        }
        this.contribution = model;
    }

    @action.bound async initializeForm() {
        const fields = contributionEditFormFields(this.contribution, this.achId, this.checkId, this.chaseQuickPayId, this.stockAndMutualFundsId, this.donorAccount);
        this.form = new FormBase({
            onSuccess: async (form) => {
                const item = form.values();
                try {
                    const response = await this.contributionService.update({ id: this.contributionId, ...item });
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    await this.load();
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
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

    @action.bound async getDonorAccount() {
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber,contributionSettings'];
        this.donorAccount = await this.donorAccountService.get(this.contribution.donorAccountId, params)
    }

    @action.bound async getBankAccounts() {
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = 'bankAccount,accountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        this.bankAccounts = await this.bankAccountService.getDonorAccountCollection(this.contribution.donorAccountId, params);
    }

    @action.bound async loadLookups() {
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let paymentTypesModels = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(paymentTypesModels.data, ['sortOrder'], ['asc']);

        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);
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
}

export default ContributionEditViewStore;

export const contributionEditFormFields = (contribution, achId, checkId, chaseQuickPayId, stockAndMutualFundsId, donorAccount) => [
    {
        name: 'id',
        rules: 'required|string',
        value: contribution.id
    },
    {
        name: 'donorAccountId',
        rules: 'required|string',
        value: contribution.donorAccountId
    },
    {
        name: 'amount',
        label: 'CONTRIBUTIONEDITFORM.AMOUNT',
        rules: 'required|numeric|min:0',
        value: contribution.amount
    },
    {
        name: 'description',
        label: 'CONTRIBUTIONEDITFORM.DESCRIPTION',
        rules: 'string',
        value: contribution.description
    },
    {
        name: 'paymentTypeId',
        label: 'CONTRIBUTIONEDITFORM.PAYMENTTYPEID',
        rules: 'required|string',
        value: contribution.paymentTypeId
    },
    {
        name: 'bankAccountId',
        label: 'CONTRIBUTIONEDITFORM.BANKACCOUNTID',
        rules: `required_if:paymentTypeId,${achId}|string`,
        value: contribution.bankAccountId
    },
    {
        name: 'checkNumber',
        label: 'CONTRIBUTIONEDITFORM.CHECKNUMBER',
        rules: `required_if:paymentTypeId,${checkId}|string`,
        value: contribution.checkNumber
    },
    {
        name: 'payerInformation',
        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION',
        fields: [
            {
                name: 'firstName',
                label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.FIRSTNAME',
                rules: 'required|string',
                value: contribution.payerInformation.firstName,
                defaultValue: donorAccount.coreUser.firstName
            },
            {
                name: 'lastName',
                label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.LASTNAME',
                rules: 'required|string',
                value: contribution.payerInformation.lastName,
                defaultValue: donorAccount.coreUser.lastName
            },
            {
                name: 'address',
                label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS',
                fields: [
                    {
                        name: 'addressLine1',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE1',
                        rules: 'required|string',
                        value: contribution.payerInformation.address.addressLine1,
                        defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine1
                    },
                    {
                        name: 'addressLine2',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ADDRESSLINE2',
                        rules: 'string',
                        value: contribution.payerInformation.address.addressLine2,
                        defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.addressLine2
                    },
                    {
                        name: 'city',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.CITY',
                        rules: 'required|string',
                        value: contribution.payerInformation.address.city,
                        defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.city
                    },
                    {
                        name: 'state',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.STATE',
                        rules: 'required|string',
                        value: contribution.payerInformation.address.state,
                        defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.state
                    },
                    {
                        name: 'zipCode',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.ADDRESS.ZIPCODE',
                        rules: 'required|string',
                        value: contribution.payerInformation.address.zipCode,
                        defaultValue: _.find(donorAccount.donorAccountAddresses, { primary: true }).address.zipCode
                    },
                ]
            },
            {
                name: 'emailAddress',
                label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS',
                fields: [
                    {
                        name: 'email',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.EMAILADDRESS.EMAIL',
                        rules: 'required|string',
                        value: contribution.payerInformation.emailAddress.email,
                        defaultValue: _.find(donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress.email
                    },
                ]
            },
            {
                name: 'phoneNumber',
                label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER',
                fields: [
                    {
                        name: 'number',
                        label: 'CONTRIBUTIONEDITFORM.PAYERINFORMATION.PHONENUMBER.NUMBER',
                        rules: 'required|string',
                        value: contribution.payerInformation.phoneNumber.number,
                        defaultValue: _.find(donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber.number
                    },
                ]
            },
        ]
    },
    {
        name: 'financialInstitution',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTION',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
        value: contribution.financialInstitution
    },
    {
        name: 'financialInstitutionAddressLine1',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE1',
        rules: `string`,
        value: contribution.financialInstitutionAddressLine1
    },
    {
        name: 'financialInstitutionAddressLine2',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONADDRESSLINE2',
        rules: 'string',
        value: contribution.financialInstitutionAddressLine2
    },
    {
        name: 'financialInstitutionCity',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONCITY',
        rules: `string`,
        value: contribution.financialInstitutionCity
    },
    {
        name: 'financialInstitutionState',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONSTATE',
        rules: `string`,
        value: contribution.financialInstitutionState
    },
    {
        name: 'financialInstitutionZipCode',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONZIPCODE',
        rules: `string`,
        value: contribution.financialInstitutionZipCode
    },
    {
        name: 'financialInstitutionPhoneNumber',
        label: 'CONTRIBUTIONEDITFORM.FINANCIALINSTITUTIONPHONENUMBER',
        rules: `string`,
        value: contribution.financialInstitutionPhoneNumber
    },
    {
        name: 'accountNumber',
        label: 'CONTRIBUTIONEDITFORM.ACCOUNTNUMBER',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
        value: contribution.accountNumber
    },
    {
        name: 'securityType',
        label: 'CONTRIBUTIONEDITFORM.SECURITYTYPE',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
        value: contribution.securityType
    },
    {
        name: 'securitySymbol',
        label: 'CONTRIBUTIONEDITFORM.SECURITYSYMBOL',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|string`,
        value: contribution.securitySymbol
    },
    {
        name: 'numberOfShares',
        label: 'CONTRIBUTIONEDITFORM.NUMBEROFSHARES',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:0`,
        value: contribution.numberOfShares
    },
    {
        name: 'estimatedValue',
        label: 'CONTRIBUTIONEDITFORM.ESTIMATEDVALUE',
        rules: `required_if:paymentTypeId,${stockAndMutualFundsId}|numeric|min:10000`,
        value: contribution.estimatedValue
    },
    {
        name: 'transactionId',
        label: 'CONTRIBUTIONEDITFORM.TRANSACTIONID',
        rules: `required_if:paymentTypeId,${chaseQuickPayId}|string`,
        value: contribution.transactionId
    },
    {
        name: 'memo',
        label: 'CONTRIBUTIONEDITFORM.MEMO',
        rules: 'string',
        value: contribution.memo
    }

]