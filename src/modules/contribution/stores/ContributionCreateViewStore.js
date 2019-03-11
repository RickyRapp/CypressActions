import { action, observable } from 'mobx';
import _ from 'lodash';
import { ContributionCreateForm } from 'modules/contribution/forms';
import { ContributionService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { isSome } from 'core/utils';

class ContributionCreateViewStore extends BaseEditViewStore {
    paymentTypes = null;
    bankAccounts = null;
    donorAccount = null;
    @observable showBankAccounts = false;
    @observable showPayerInformation = false;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        const paymentTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id

        super(rootStore, {
            name: 'contribution',
            actions: {
                create: async newContribution => {
                    await contributionService.createContribution(userId, newContribution);
                }
            },
            FormClass: ContributionCreateForm
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);

        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber'];
        this.donorAccountPromise = this.donorAccountService.get(userId, params)

        this.bankAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                clearable: false,
                textField: 'name',
                dataItemKey: 'id',
                placeholder: 'Choose Bank Account'
            },
            {
                fetchFunc: async term => {
                    let response = null;
                    if (isSome(this.bankAccounts) && this.bankAccounts.length > 0) {
                        response = this.bankAccounts
                    }
                    else {
                        let params = {};
                        params.embed = 'bankAccount,accountHolder,address,emailAddress,phoneNumber'
                        params.sort = ['dateCreated|asc']
                        response = await this.bankAccountService.getDonorAccountCollection(userId, params);
                    }

                    if (response) {
                        this.bankAccounts = response;
                        return _.map(response, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } });
                    }
                },
                onChange: this.onChangeBankAccount
            }
        );

        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                clearable: false,
                textField: 'name',
                dataItemKey: 'id',
                placeholder: 'Choose Payment Type'
            },
            {
                fetchFunc: async term => {
                    let models = await paymentTypeLookupService.getAll();
                    this.paymentTypes = models.data;
                    return models.data;
                },
                onChange: this.onChangePaymentType
            }
        );
    }

    @action.bound async onChangePaymentType(option) {
        this.form.$('paymentType').set('value', option);
        if (option.id === _.find(this.paymentTypes, function (type) { return (type.abrv === 'ach') }).id) {
            this.showBankAccounts = true;
        }
        else if (option.id === _.find(this.paymentTypes, function (type) { return (type.abrv === 'wire-transfer') }).id) {
            this.showBankAccounts = true;
            this.form.$('bankAccount').each(field => field.resetValidation());
        }
        else {
            this.showBankAccounts = false;
            this.form.$('bankAccount').each(field => field.resetValidation());
            await this.onChangeBankAccount(null);
            this.donorAccount = await this.donorAccountPromise;
            this.form.$('payerInformation.firstName').set('value', this.donorAccount.coreUser.firstName);
            this.form.$('payerInformation.lastName').set('value', this.donorAccount.coreUser.lastName);
            this.form.$('payerInformation.address').set('value', (_.find(this.donorAccount.donorAccountAddresses, function (donorAddress) { return (donorAddress.primary === true) })).address);
            this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, function (donorEmailAddress) { return (donorEmailAddress.primary) }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, function (donorPhoneNumber) { return (donorPhoneNumber.primary) }).phoneNumber);
        }
    }

    @action.bound async onChangeBankAccount(option) {
        if (option) {
            this.form.$('bankAccount').set('value', option);
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', donorBankAccount.bankAccount.accountHolder);
            this.form.$('payerInformation').each(field => field.resetValidation());
            this.form.$('payerInformation').each(field => field.set('disabled', true));
        }
        else {
            this.form.$('bankAccount').clear();
            this.form.$('payerInformation').clear();
            this.form.$('payerInformation').each(field => field.set('disabled', false));
        }
    }

    @action.bound async onChangeShowPayerInformation(event) {
        this.showPayerInformation = event.target.checked;
    }
}

export default ContributionCreateViewStore;
