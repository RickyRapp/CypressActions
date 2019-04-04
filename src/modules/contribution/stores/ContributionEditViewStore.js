import { action, observable, computed } from 'mobx';
import { ContributionEditForm } from 'modules/contribution/forms';
import { ContributionService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import moment from 'moment';
import _ from 'lodash';

class ContributionEditViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    contribution = null;
    @observable showPayerInformation = false;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        let contributionId = rootStore.routerStore.routerState.params.contributionId;

        super(rootStore, {
            name: 'contribution',
            id: contributionId,
            actions: {
                update: async contribution => {
                    try {

                        return await contributionService.update({ id: this.id, ...contribution })
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                },
                get: async id => {
                    let params = {};
                    params.embed = ['payerInformation,address,emailAddress,phoneNumber,paymentType,bankAccount,createdByCoreUser,contributionStatus'];
                    let model = await contributionService.get(id, params);
                    if (model.json && JSON.parse(model.json).paymentTypeInformations) {
                        _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                            model[key] = value;
                        });
                    }
                    this.contribution = model;
                    return this.contribution;
                }
            },
            FormClass: ContributionEditForm,
            autoInit: false //need to load all lookups and donors data before contribution
        });

        this.userId = rootStore.routerStore.routerState.params.id;

        const contributionEmployeeUpdate = rootStore.authStore.hasPermission('theDonorsFundSection.update');
        this.permissions = {
            employeeUpdate: contributionEmployeeUpdate,
        }

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
            this.rootStore.routerStore.navigate('master.app.main.contribution.list')
        }

        this.load();
    }

    @action.bound async load() {
        await this.initialize();
        if (moment().local().isAfter(moment.utc(this.item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes')) && !this.permissions.employeeUpdate) {
            this.rootStore.routerStore.navigate('master.app.main.contribution.list')
        }
        await this.getDonorAccount();
        this.setAdditionalFieldValidation();
        await this.getPaymentTypes();
        await this.getBankAccounts();
        await this.setStores();

        if (this.form.$('paymentTypeId').value === this.achId) {
            this.form.$('bankAccountId').set('rules', 'required|string');
        }
        else if (this.form.$('paymentTypeId').value === this.checkId) {
            this.form.$('checkNumber').set('rules', 'required|string');
        }

        if (this.form.$('bankAccountId').value) {
            this.form.$('payerInformation').each(field => field.set('disabled', true));
        }
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('bankAccountId').clear();
        this.form.$('payerInformation').clear();
        this.form.$('payerInformation').each(field => field.set('disabled', false));

        this.form.$('bankAccountId').set('rules', 'string');
        this.form.$('checkNumber').set('rules', 'string');
        this.form.$('financialInstitution').set('rules', 'string');
        this.form.$('accountNumber').set('rules', 'string');
        this.form.$('securityType').set('rules', 'string');
        this.form.$('numberOfShares').set('rules', 'numeric|min:0');
        this.form.$('estimatedValue').set('rules', 'numeric|min:10000');
        this.form.$('securitySymbol').set('rules', 'string');
        this.form.$('transactionId').set('rules', 'string');

        if (option && option.id === this.achId) {
            this.form.$('bankAccountId').set('rules', 'required|string');
        }
        else {
            if (option && option.id === this.checkId) {
                this.form.$('checkNumber').set('rules', 'required|string');
            }
            else if (option && option.id === this.stockAndMutualFundsId) {
                this.form.$('financialInstitution').set('rules', 'required|string');
                this.form.$('accountNumber').set('rules', 'required|string');
                this.form.$('securityType').set('rules', 'required|string');
                this.form.$('numberOfShares').set('rules', 'required|numeric|min:0');
                this.form.$('estimatedValue').set('rules', 'required|numeric|min:10000');
                this.form.$('securitySymbol').set('rules', 'required|string');
            }
            else if (option && option.id === this.chaseQuickPayId) {
                this.form.$('transactionId').set('rules', 'required|string');
            }
            this.setDefaultPayerInformations();
        }
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', donorBankAccount.bankAccount.accountHolder);
            this.form.$('payerInformation').each(field => field.resetValidation());
            this.form.$('payerInformation').each(field => field.set('disabled', true));
        }
        else {
            this.form.$('bankAccountId').clear();
            this.form.$('payerInformation').clear();
            this.form.$('payerInformation').each(field => field.set('disabled', false));

            if (this.form.$('paymentTypeId').value === this.wireTransferId) {
                this.setDefaultPayerInformations();
            }
        }
    }

    @action async setDefaultPayerInformations() {
        this.form.$('payerInformation.firstName').set('value', this.donorAccount.coreUser.firstName);
        this.form.$('payerInformation.lastName').set('value', this.donorAccount.coreUser.lastName);
        this.form.$('payerInformation.address').set('value', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
        this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
        this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);
    }

    @action.bound async onChangeShowPayerInformation(event) {
        this.showPayerInformation = event.target.checked;
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async getDonorAccount() {
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber'];
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

    @action.bound async getPaymentTypes() {
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let models = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(models.data, ['sortOrder'], ['asc']);
    }

    @action.bound async setAdditionalFieldValidation() {
        let minimumAmount = 0;
        if (!this.permissions.employeeUpdate) {
            if (this.donorAccount.initialContribution) {
                minimumAmount = this.donorAccount.contributionMinimumAdditional;
            }
            else {
                minimumAmount = this.donorAccount.contributionMinimumInitial;
            }
        }
        this.form.$('amount').set('rules', `required|numeric|min:${minimumAmount}`);
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

    @computed get isPayerInformationValid() {
        if (this.form) {
            let valid = true;
            this.form.$('payerInformation').each(field => {
                if (field.error) {
                    valid = false;
                    return false;
                }
            });
            return valid;
        }
        return false;
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
        this.paymentTypeDropdownStore.value = this.form.$('paymentTypeId').value;

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

        if (this.form.$('bankAccountId').value) {
            this.bankAccountDropdownStore.value = this.form.$('bankAccountId').value;
        }
    }
}

export default ContributionEditViewStore;
