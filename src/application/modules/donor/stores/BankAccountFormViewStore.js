import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { BankAccountEditForm } from 'application/donor/forms';
import { DonorFileStreamService } from 'common/services';
import { DonorBankAccountService, DonorService } from 'application/donor/services';
import { RoutingNumberService } from 'application/administration/bank/services';
import { action } from 'mobx';
import { applicationContext } from 'core/utils';

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
                        return props.bankAccount;
                    }
                    else if (props.editId) {
                        const response = await service.get(props.editId);
                        return response.data;
                    }
                    else {
                        rootStore.notificationStore.warning("Something went wrong. Please try again.");
                        rootStore.routerStore.goBack();
                    }
                },
                update: async (resource) => {
                    await service.update(resource);
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        const fileStreamService = new DonorFileStreamService(this.rootStore.application.baasic.apiClient);
                        await fileStreamService.uploadDonorBankAccount(this.imageUploadStore.files[0], this.donorId, resource.id);
                    }
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                },
                create: async (resource) => {
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
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });

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

            if (!this.isEdit) {
                this.form.update({
                    accountHolderName: this.donor.donorName,
                    addressLine1: this.primaryAddress.addressLine1,
                    addressLine2: this.primaryAddress.addressLine2,
                    city: this.primaryAddress.city,
                    state: this.primaryAddress.state,
                    zipCode: this.primaryAddress.zipCode,
                    email: this.primaryEmailAddress.email,
                    number: this.primaryPhoneNumber.number
                });
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
                this.rootStore.notificationStore.success('Found!');
            }
        }
    }

    @action.bound
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

}

export default BankAccountFormViewStore;
