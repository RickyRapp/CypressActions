import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { BankAccountService, DonorAccountService, FileStreamService } from "common/data";
import { DonorAccountBankAccountCreateForm } from "modules/common/bank-account/forms";
import { donorPath, bankAccountPath } from "core/utils"
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
                    let params = {};
                    params.embed = [
                        'coreUser',
                        'companyProfile',
                        'donorAccountAddresses',
                        'donorAccountAddresses.address',
                        'donorAccountEmailAddresses',
                        'donorAccountEmailAddresses.emailAddress',
                        'donorAccountPhoneNumbers',
                        'donorAccountPhoneNumbers.phoneNumber'
                    ];

                    params.fields = [
                        'id',
                        'donorName',
                        'accountNumber',
                        'donorAccountAddresses',
                        'donorAccountAddresses.primary',
                        'donorAccountAddresses.address',
                        'donorAccountAddresses.address.addressLine1',
                        'donorAccountAddresses.address.addressLine2',
                        'donorAccountAddresses.address.state',
                        'donorAccountAddresses.address.city',
                        'donorAccountAddresses.address.zipCode',
                        'donorAccountEmailAddresses',
                        'donorAccountEmailAddresses.primary',
                        'donorAccountEmailAddresses.emailAddress',
                        'donorAccountEmailAddresses.emailAddress.email',
                        'donorAccountPhoneNumbers',
                        'donorAccountPhoneNumbers.primary',
                        'donorAccountPhoneNumbers.phoneNumber',
                        'donorAccountPhoneNumbers.phoneNumber.number',
                    ];
                    const donorAccount = await donorAccountService.get(userId, params);
                    if (!bankAccount.thirdParty) {
                        bankAccount.thirdPartyAccountHolder.name = donorAccount.donorName;
                        var primaryDonorAccountAddress = _.find(donorAccount.donorAccountAddresses, { primary: true })
                        bankAccount.thirdPartyAccountHolder.address = primaryDonorAccountAddress.address;
                        var primaryDonorAccountEmailAddress = _.find(donorAccount.donorAccountEmailAddresses, { primary: true })
                        bankAccount.thirdPartyAccountHolder.emailAddress = primaryDonorAccountEmailAddress.emailAddress;
                        var primaryDonorAccountPhoneNumber = _.find(donorAccount.donorAccountPhoneNumbers, { primary: true })
                        bankAccount.thirdPartyAccountHolder.phoneNumber = primaryDonorAccountPhoneNumber.phoneNumber;
                    }
                    if (this.form.$('image').files) {
                        const fileResponse = await fileStreamService.create(
                            this.form.$('image').files[0],
                            donorPath + donorAccount.accountNumber + '/' + bankAccountPath + this.form.$('image').files[0].name
                        );
                        bankAccount.coreMediaVaultEntryId = fileResponse.data.id;
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