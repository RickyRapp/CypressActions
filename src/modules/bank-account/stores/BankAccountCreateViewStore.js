import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { BankAccountService, DonorAccountService } from "common/data";
import { DonorAccountBankAccountPostForm } from "modules/bank-account/forms";
import _ from 'lodash';

class BankAccountCreateViewStore extends BaseEditViewStore {
    @observable thirdParty = false;

    constructor(rootStore, { onAfterCreate }) {
        const bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        const id = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'bank account',
            actions: {
                create: async bankAccount => {
                    if (!this.thirdParty) {
                        let params = {};
                        params.embed = ['coreUser,donorAccountAddresses,address,donorAccountEmailAddresses,emailAddress,donorAccountPhoneNumbers,phoneNumber'];
                        const donorAccount = await donorAccountService.get(id, params);
                        bankAccount.accountHolder.firstName = donorAccount.coreUser.firstName;
                        bankAccount.accountHolder.lastName = donorAccount.coreUser.lastName;
                        var primaryDonorAccountAddress = _.find(donorAccount.donorAccountAddresses, { primary: true })
                        bankAccount.accountHolder.address = primaryDonorAccountAddress.address;
                        var primaryDonorAccountEmailAddress = _.find(donorAccount.donorAccountEmailAddresses, { primary: true })
                        bankAccount.accountHolder.emailAddress = primaryDonorAccountEmailAddress.emailAddress;
                        var primaryDonorAccountPhoneNumber = _.find(donorAccount.donorAccountPhoneNumbers, { primary: true })
                        bankAccount.accountHolder.phoneNumber = primaryDonorAccountPhoneNumber.phoneNumber;
                    }
                    await bankAccountService.createDonorAccountCollection({ id: id }, { 'bankAccount': bankAccount });
                }
            },
            FormClass: DonorAccountBankAccountPostForm,
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

export default BankAccountCreateViewStore;