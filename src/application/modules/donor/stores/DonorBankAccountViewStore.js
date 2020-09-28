import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicUploadStore } from 'core/stores';
import { DonorFileStreamService } from 'common/services';
import {
    DonorBankAccountService,
    DonorService
} from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorBankAccountEditForm } from 'application/donor/forms';
import { RoutingNumberService } from 'application/administration/bank/services';

@applicationContext
class DonorBankAccountViewStore extends BaseListViewStore {
    bankAccountService = null;

    formBankAccount = new DonorBankAccountEditForm({
        onSuccess: async form => {
            const bankAccount = form.values();
            if (bankAccount.id) {
                await this.updateBankAccountAsync(bankAccount);
            }
            else {
                await this.createBankAccountAsync(bankAccount);
            }
        }
    });

    constructor(rootStore, donorId) {
        super(rootStore, {
            name: 'bank-accounts',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'accountHolder'
                        ];
                        params.donorId = donorId;
                        params.orderBy = 'dateCreated';
                        params.orderDirection = 'desc';
                        const response = await this.bankAccountService.find({ userId: donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = donorId;
        this.bankAccountModal = new ModalParams({
            onClose: () => {
                this.imageUploadStore.clear();
            }
        });
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: (fileId) => {
                //async call to delete if needed
                this.formBankAccount.$('coreMediaVaultEntryId').clear();
            }
        })

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.NAME_LABEL',
                    onClick: (bankAccount) => this.openBankAccountModal(bankAccount)
                },
                {
                    key: 'accountNumber',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_NUMBER_LABEL'
                },
                {
                    key: 'routingNumber',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ROUTING_NUMBER_LABEL',
                    format: {
                        type: 'routing-number'
                    }
                },
                {
                    key: 'isThirdPartyAccount',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.IS_THIRD_PARTY_ACCOUNT_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'accountHolder',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_ADDRESS_LABEL',
                    format: {
                        type: 'address',
                        value: 'full'
                    }
                },
                {
                    key: 'accountHolder.email',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_EMAIL_ADDRESS_LABEL'
                },
                {
                    key: 'accountHolder.number',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_PHONE_NUMBER_LABEL',
                    format: {
                        type: 'phone-number'
                    }
                },
                {
                    key: 'coreMediaVaultEntryId',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.IMAGE_LABEL',
                    format: {
                        type: 'image',
                        target: '_blank',
                        fetch: (id) => { return this.donorFileStreamRouteService.getPreview(id); }
                    }
                },
            ],
            actions: {
                onEdit: (bankAccount) => this.openBankAccountModal(bankAccount),
                onDelete: (bankAccount) => this.deleteBankAccount(bankAccount),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            disablePaging: true
        }));
    }

    @action.bound
    async openBankAccountModal(bankAccount) {
        this.formBankAccount.clear();
        if (bankAccount) {
            this.formBankAccount.update({
                ...bankAccount,
                accountHolderName: bankAccount.accountHolder.name,
                addressLine1: bankAccount.accountHolder.addressLine1,
                addressLine2: bankAccount.accountHolder.addressLine2,
                city: bankAccount.accountHolder.city,
                state: bankAccount.accountHolder.state,
                zipCode: bankAccount.accountHolder.zipCode,
                email: bankAccount.accountHolder.email,
                number: bankAccount.accountHolder.number
            });
            if (bankAccount.coreMediaVaultEntryId) {
                this.imageUploadStore.setInitialItems(bankAccount.coreMediaVaultEntryId);
            }
        }
        else {
            const donor = await this.getDonorInfo();
            const primaryAddress = donor.donorAddresses.find((c) => c.isPrimary);
            const primaryEmailAddress = donor.donorEmailAddresses.find((c) => c.isPrimary);
            const primaryPhoneNumber = donor.donorPhoneNumbers.find((c) => c.isPrimary);

            this.formBankAccount.update({
                accountHolderName: donor.donorName,
                addressLine1: primaryAddress.addressLine1,
                addressLine2: primaryAddress.addressLine2,
                city: primaryAddress.city,
                state: primaryAddress.state,
                zipCode: primaryAddress.zipCode,
                email: primaryEmailAddress.email,
                number: primaryPhoneNumber.number
            });

        }
        this.bankAccountModal.open({
            formBankAccount: this.formBankAccount,
            imageUploadStore: this.imageUploadStore,
            useDonorContactInformations: this.useDonorContactInformations,
            onBlurRoutingNumber: this.checkBank
        });
    }

    @action.bound
    async updateBankAccountAsync(entity, message) {
        try {
            await this.bankAccountService.update(entity);
            if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                await this.insertImage(entity.id, this.imageUploadStore.files[0]);
            }

            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.bankAccountModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async createBankAccountAsync(entity) {
        try {
            await this.bankAccountService.create({
                donorId: this.donorId,
                ...entity
            });
            if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                await this.insertImage(entity.id, this.imageUploadStore.files[0]);
            }

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            this.bankAccountModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

    @action.bound
    async useDonorContactInformations(type) {
        const donor = await this.getDonorInfo();
        if (type === 'address') {
            const primaryAddress = donor.donorAddresses.find((c) => c.isPrimary);
            if (primaryAddress) {
                this.formBankAccount.$('addressLine1').set(primaryAddress.addressLine1)
                this.formBankAccount.$('addressLine2').set(primaryAddress.addressLine2)
                this.formBankAccount.$('city').set(primaryAddress.city)
                this.formBankAccount.$('state').set(primaryAddress.state)
                this.formBankAccount.$('zipCode').set(primaryAddress.zipCode)
            }
        }
        else if (type === 'emailAddress') {
            const primaryEmailAddress = donor.donorEmailAddresses.find((c) => c.isPrimary);
            if (primaryEmailAddress) {
                this.formBankAccount.$('email').set(primaryEmailAddress.email);
            }
        }
        else if (type === 'phoneNumber') {
            const primaryPhoneNumber = donor.donorPhoneNumbers.find((c) => c.isPrimary);
            if (primaryPhoneNumber) {
                this.formBankAccount.$('number').set(primaryPhoneNumber.number)
            }
        }
    }

    async getDonorInfo() {
        const donorService = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await donorService.get(this.donorId, { embed: 'donorAddresses,donorEmailAddresses,donorPhoneNumbers', fields: 'donorName,donorAddresses,donorEmailAddresses,donorPhoneNumbers' });
        return response.data;
    }

    @action.bound
    async insertImage(bankAccountId, file) {
        try {
            const service = new DonorFileStreamService(this.rootStore.application.baasic.apiClient);
            const response = await service.uploadDonorBankAccount(file, this.donorId, bankAccountId);
            return response.data.id;
        }
        catch (err) {
            this.rootStore.notificationStore.error('ERROR', err);
        }
    }

    @action.bound
    async deleteBankAccount(bankAccount) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank account?`,
            async () => {
                bankAccount.isDeleted = true;
                if (bankAccount.isThirdPartyAccount) {
                    bankAccount.accountHolderName = bankAccount.accountHolder.name;
                    bankAccount.addressLine1 = bankAccount.accountHolder.addressLine1;
                    bankAccount.addressLine2 = bankAccount.accountHolder.addressLine2;
                    bankAccount.city = bankAccount.accountHolder.city;
                    bankAccount.state = bankAccount.accountHolder.state;
                    bankAccount.zipCode = bankAccount.accountHolder.zipCode;
                    bankAccount.email = bankAccount.accountHolder.email;
                    bankAccount.number = bankAccount.accountHolder.number;
                }
                await this.updateBankAccountAsync(bankAccount, 'EDIT_FORM_LAYOUT.SUCCESS_DELETE');
            }
        );
    }

    @action.bound
    async checkBank(value) {
        if (value && value.replace(/-/g, "").length === 9) {
            const service = new RoutingNumberService(this.rootStore.application.baasic.apiClient);
            const response = await service.find({
                pageNumber: 1,
                pageSize: 10,
                embed: ['bank'],
                number: value
            });

            if (response.data && response.data.item.length > 0) {
                this.formBankAccount.$('name').set(response.data.item[0].bank.name);
                this.rootStore.notificationStore.success('Found!');
            }
        }
    }
}

export default DonorBankAccountViewStore;
