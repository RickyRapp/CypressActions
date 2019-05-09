import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { BankAccountService, DonorAccountService, FileStreamService } from "common/data";
import { DonorAccountBankAccountCreateForm } from "modules/common/bank-account/forms";
import _ from 'lodash';

class BankAccountCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate, userId }) {
        const bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        const fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'bank account',
            actions: {
                create: async bankAccount => {
                    if (!bankAccount.thirdParty) {
                        let params = {};
                        params.embed = ['coreUser,donorAccountAddresses,address,donorAccountEmailAddresses,emailAddress,donorAccountPhoneNumbers,phoneNumber'];
                        const donorAccount = await donorAccountService.get(userId, params);
                        debugger;
                        bankAccount.thirdPartyAccountHolder.firstName = donorAccount.coreUser.firstName;
                        bankAccount.thirdPartyAccountHolder.lastName = donorAccount.coreUser.lastName;
                        var primaryDonorAccountAddress = _.find(donorAccount.donorAccountAddresses, { primary: true })
                        bankAccount.thirdPartyAccountHolder.address = primaryDonorAccountAddress.address;
                        var primaryDonorAccountEmailAddress = _.find(donorAccount.donorAccountEmailAddresses, { primary: true })
                        bankAccount.thirdPartyAccountHolder.emailAddress = primaryDonorAccountEmailAddress.emailAddress;
                        var primaryDonorAccountPhoneNumber = _.find(donorAccount.donorAccountPhoneNumbers, { primary: true })
                        bankAccount.thirdPartyAccountHolder.phoneNumber = primaryDonorAccountPhoneNumber.phoneNumber;
                    }
                    if (this.form.$('image').files) {
                        const response = await fileStreamService.createDonorAccountBankAccountImage(this.form.$('image').files[0], userId)
                        bankAccount.coreMediaVaultEntryId = response.data.id;
                    }
                    return await bankAccountService.createBankAccount(userId, bankAccount);
                }
            },
            FormClass: DonorAccountBankAccountCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default BankAccountCreateViewStore;