import { action, observable, computed } from 'mobx';
import { ContributionCreateForm } from 'modules/contribution/forms';
import { ContributionService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showPayerInformation = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'contribution',
            actions: {
                create: async newContribution => {
                    await contributionService.createContribution(userId, newContribution);
                }
            },
            FormClass: ContributionCreateForm
        });

        this.userId = userId;

        const contributionEmployeeCreate = rootStore.authStore.hasPermission('theDonorsFundSection.create');
        this.permissions = {
            employeeCreate: contributionEmployeeCreate,
        }

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
        await this.getDonorAccount();
        await this.getPaymentTypes();
        await this.getBankAccounts();
        await this.setStores();
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }

        if (option && option.id === _.find(this.paymentTypes, { abrv: 'ach' }).id) {
            this.form.$('bankAccountId').set('rules', 'required|string');
        }
        else if (option && option.id === _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id) {
            this.form.$('bankAccountId').set('rules', 'string');
        }
        else {
            this.form.$('bankAccountId').set('rules', 'string');
            await this.bankAccountDropdownStore.onChange(null);

            this.form.$('payerInformation.firstName').set('value', this.donorAccount.coreUser.firstName);
            this.form.$('payerInformation.lastName').set('value', this.donorAccount.coreUser.lastName);
            this.form.$('payerInformation.address').set('value', (_.find(this.donorAccount.donorAccountAddresses, function (donorAddress) { return (donorAddress.primary === true) })).address);
            this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, function (donorEmailAddress) { return (donorEmailAddress.primary) }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, function (donorPhoneNumber) { return (donorPhoneNumber.primary) }).phoneNumber);
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
        }
    }

    @action.bound async onChangeShowPayerInformation(event) {
        this.showPayerInformation = event.target.checked;
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
        this.paymentTypes = models.data;
    }

    @computed get showBankAccounts() {
        if (this.form && this.paymentTypes) {
            if (this.form.$("paymentTypeId").value === _.find(this.paymentTypes, { abrv: 'ach' }).id) {
                return true;
            }
            if (this.form.$("paymentTypeId").value == _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id) {
                return true;
            }
        }
        return false;
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
}

export default ContributionCreateViewStore;
