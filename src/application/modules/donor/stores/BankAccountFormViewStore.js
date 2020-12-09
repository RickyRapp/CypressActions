import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { BankAccountEditForm } from 'application/donor/forms';
import { DonorFileStreamService } from 'common/services';
import { DonorBankAccountService, DonorService } from 'application/donor/services';
import { RoutingNumberService } from 'application/administration/bank/services';
import { action } from 'mobx';
import { applicationContext, isSome } from 'core/utils';

@applicationContext
class BankAccountFormViewStore extends BaseEditViewStore {
    constructor(rootStore, props) {
        const service = new DonorBankAccountService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'bank-account',
            id: props.editId,
            actions: {
                get: async () => {
                    if (props.bankAccount) {
                        return {
                            name: props.bankAccount.name,
                            accountNumber: props.bankAccount.accountNumber,
                            routingNumber: props.bankAccount.routingNumber,
                            description: props.bankAccount.description,
                            coreMediaVaultEntryId: props.bankAccount.coreMediaVaultEntryId,
                            isThirdPartyAccount: props.bankAccount.isThirdPartyAccount,
                            accountHolderName: props.bankAccount.accountHolder.name,
                            addressLine1: props.bankAccount.accountHolder.addressLine1,
                            addressLine2: props.bankAccount.accountHolder.addressLine2,
                            city: props.bankAccount.accountHolder.city,
                            state: props.bankAccount.accountHolder.state,
                            zipCode: props.bankAccount.accountHolder.zipCode,
                            email: props.bankAccount.accountHolder.email,
                            number: props.bankAccount.accountHolder.number
                        };
                    }
                    else if (props.editId) {
                        const response = await service.get(props.editId);
                        return {
                            name: response.data.name,
                            accountNumber: response.data.accountNumber,
                            routingNumber: response.data.routingNumber,
                            description: response.data.description,
                            coreMediaVaultEntryId: response.data.coreMediaVaultEntryId,
                            isThirdPartyAccount: response.data.isThirdPartyAccount,
                            accountHolderName: response.data.accountHolder.name,
                            addressLine1: response.data.accountHolder.addressLine1,
                            addressLine2: response.data.accountHolder.addressLine2,
                            city: response.data.accountHolder.city,
                            state: response.data.accountHolder.state,
                            zipCode: response.data.accountHolder.zipCode,
                            email: response.data.accountHolder.email,
                            number: response.data.accountHolder.number
                        };
                    }
                    else {
                        rootStore.notificationStore.warning("Something went wrong. Please try again.");
                        rootStore.routerStore.goBack();
                    }
                },
                update: async (resource) => {
                    if (!resource.isThirdPartyAccount) {
                        resource.accountHolderName = this.donor.donorName;
                        resource.addressLine1 = this.primaryAddress.addressLine1;
                        resource.addressLine2 = this.primaryAddress.addressLine2;
                        resource.city = this.primaryAddress.city;
                        resource.state = this.primaryAddress.state;
                        resource.zipCode = this.primaryAddress.zipCode;
                        resource.email = this.primaryEmailAddress.email;
                        resource.number = this.primaryPhoneNumber.number;
                    }

                    await service.update({ id: this.editId, ...resource });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        const fileStreamService = new DonorFileStreamService(this.rootStore.application.baasic.apiClient);
                        await fileStreamService.uploadDonorBankAccount(this.imageUploadStore.files[0], this.donorId, resource.id);
                    }
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                },
                create: async (resource) => {
                    if (!resource.isThirdPartyAccount) {
                        resource.accountHolderName = this.donor.donorName;
                        resource.addressLine1 = this.primaryAddress.addressLine1;
                        resource.addressLine2 = this.primaryAddress.addressLine2;
                        resource.city = this.primaryAddress.city;
                        resource.state = this.primaryAddress.state;
                        resource.zipCode = this.primaryAddress.zipCode;
                        resource.email = this.primaryEmailAddress.email;
                        resource.number = this.primaryPhoneNumber.number;
                    }

                    const response = await service.create({
                        donorId: this.donorId,
                        ...resource
                    });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        const fileStreamService = new DonorFileStreamService(this.rootStore.application.baasic.apiClient);
                        await fileStreamService.uploadDonorBankAccount(this.imageUploadStore.files[0], this.donorId, response.data);
                    }
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                }
            },
            FormClass: BankAccountEditForm,
            onAfterAction: () => {
                if (props.onAfterAction) {
                    props.onAfterAction()
                }
            }
        });

        this.donorId = props.donorId;
        this.createImageUploadStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getDonorInfo()
            ]);

            if (this.isEdit) {
                if (this.form.$('coreMediaVaultEntryId').value) {
                    this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
                    this.form.$('coreMediaVaultEntryId').setDisabled(true);
                }
            }
        }
    }

    @action.bound
    async onBlurRoutingNumber(value) {
        if (value && value.replace(/-/g, "").length === 9) {
            const service = new RoutingNumberService(this.rootStore.application.baasic.apiClient);
            const response = await service.find({
                pageNumber: 1,
                pageSize: 10,
                embed: ['bank'],
                number: value
            });

            if (response.data && response.data.item.length > 0) {
                this.form.$('name').set(response.data.item[0].bank.name);
            }
        }
    }

    async getDonorInfo() {
        if (!this.donor) {
            const service = new DonorService(this.rootStore.application.baasic.apiClient);
            const response = await service.get(this.donorId, {
                embed: 'donorAddresses,donorEmailAddresses,donorPhoneNumbers',
                fields: 'donorName,donorAddresses,donorEmailAddresses,donorPhoneNumbers'
            });
            this.donor = response.data;
            this.primaryAddress = this.donor.donorAddresses.find((c) => c.isPrimary);
            this.primaryEmailAddress = this.donor.donorEmailAddresses.find((c) => c.isPrimary);
            this.primaryPhoneNumber = this.donor.donorPhoneNumbers.find((c) => c.isPrimary);
        }
    }

    @action.bound
    async useDonorContactInformations(type) {
        if (type === 'address') {
            this.form.$('addressLine1').set(this.primaryAddress.addressLine1)
            this.form.$('addressLine2').set(this.primaryAddress.addressLine2)
            this.form.$('city').set(this.primaryAddress.city)
            this.form.$('state').set(this.primaryAddress.state)
            this.form.$('zipCode').set(this.primaryAddress.zipCode)
        }
        else if (type === 'emailAddress') {
            this.form.$('email').set(this.primaryEmailAddress.email);
        }
        else if (type === 'phoneNumber') {
            this.form.$('number').set(this.primaryPhoneNumber.number)
        }
    }

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onChange: (value) => {
                this.form.$('coreMediaVaultEntryId').setDisabled(isSome(value));
            },
            onDelete: () => {
                this.form.$('coreMediaVaultEntryId').setDisabled(false);
            },
            onRemoveFromBuffer: () => {
                this.form.$('coreMediaVaultEntryId').setDisabled(false);
            }
        });
    }
}

export default BankAccountFormViewStore;
