import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { BankAccountService, DonorAccountService, AddressService, EmailAddressService, PhoneNumberService } from "common/data";
import { DonorAccountBankAccountEditForm } from "modules/bank-account/forms";
import _ from 'lodash';

class BankAccountEditViewStore extends BaseEditViewStore {
    @observable thirdParty = false;

    constructor(rootStore, { id, onAfterCreate }) {
        const bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        //const nonMemberService = new NonMemberService(rootStore.app.baasic.apiClient);
        const addressService = new AddressService(rootStore.app.baasic.apiClient);
        const emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);
        const phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;
        super(rootStore, {
            name: 'bank account',
            id: id,
            actions: {
                update: async bankAccount => {
                    if (this.form.$('accountHolder').$('phoneNumber').changed) {
                        await phoneNumberService.update(bankAccount.accountHolder.phoneNumber)
                    }
                    if (this.form.$('accountHolder').$('emailAddress').changed) {
                        await emailAddressService.update(bankAccount.accountHolder.emailAddress)
                    }
                    if (this.form.$('accountHolder').$('address').changed) {
                        await addressService.update(bankAccount.accountHolder.address)
                    }
                    if (this.form.$('accountHolder').$('firstName').changed || this.form.$('accountHolder').$('lastName').changed) {
                        alert('account holder changed');
                        //await nonMemberService.update(bankAccount.accountHolder)
                    }
                    if (this.form.$('name').changed || this.form.$('routingNumber').changed || this.form.$('description').changed) {
                        await bankAccountService.update(bankAccount);
                    }

                },
                create: async bankAccount => {
                    if (!this.thirdParty) {
                        let params = {};
                        params.embed = ['coreUser,donorAccountAddresses,address,donorAccountEmailAddresses,emailAddress,donorAccountPhoneNumbers,phoneNumber'];
                        const donorAccount = await donorAccountService.get(userId, params);
                        bankAccount.accountHolder.firstName = donorAccount.coreUser.firstName;
                        bankAccount.accountHolder.lastName = donorAccount.coreUser.lastName;
                        var primaryDonorAccountAddress = _.find(donorAccount.donorAccountAddresses, { primary: true })
                        bankAccount.accountHolder.address = primaryDonorAccountAddress.address;
                        var primaryDonorAccountEmailAddress = _.find(donorAccount.donorAccountEmailAddresses, { primary: true })
                        bankAccount.accountHolder.emailAddress = primaryDonorAccountEmailAddress.emailAddress;
                        var primaryDonorAccountPhoneNumber = _.find(donorAccount.donorAccountPhoneNumbers, { primary: true })
                        bankAccount.accountHolder.phoneNumber = primaryDonorAccountPhoneNumber.phoneNumber;
                    }
                    await bankAccountService.createDonorAccountCollection({ id: userId }, { 'bankAccount': bankAccount });
                },
                get: async id => {
                    let params = {};
                    params.embed = ['accountHolder,address,emailAddress,phoneNumber']
                    const response = await bankAccountService.get(id, params);
                    return response;
                }
            },
            FormClass: DonorAccountBankAccountEditForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }


    @action.bound
    async onThirdPartyChange(event) {
        if (event.target.checked) {
            this.thirdParty = true;
        }
        else {
            this.thirdParty = false;
        }
    }
}

export default BankAccountEditViewStore;