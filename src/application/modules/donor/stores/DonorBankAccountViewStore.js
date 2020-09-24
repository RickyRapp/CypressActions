import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import {
    DonorFileStreamRouteService,
    DonorFileStreamService
} from 'common/services';
import {
    DonorBankAccountService,
    DonorAddressService,
    DonorEmailAddressService,
    DonorPhoneNumberService,
} from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorBankAccountEditForm } from 'application/donor/forms';
import { RoutingNumberService } from 'application/administration/bank/services';

@applicationContext
class DonorBankAccountViewStore extends BaseListViewStore {
    attachment = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    bankAccountService = null;
    donorFileStreamRouteService = null;

    formBankAccount = new DonorBankAccountEditForm({
        onSuccess: async form => {
            const bankAccount = form.values();

            if (!bankAccount.isThirdPartyAccount) {
                const primaryAddress = await this.getAddress();
                const primaryEmailAddress = await this.getEmailAddress();
                const primaryPhoneNumber = await this.getPhoneNumber()
                bankAccount.accountHolder = {
                    name: '', //todo
                    addressLine1: primaryAddress.addressLine1,
                    addressLine2: primaryAddress.addressLine2,
                    city: primaryAddress.city,
                    state: primaryAddress.state,
                    zipCode: primaryAddress.zipCode,
                    email: primaryEmailAddress.email,
                    number: primaryPhoneNumber.number
                }
            }

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
                        const response = await this.bankAccountService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorId = donorId;
        this.bankAccountModal = new ModalParams({});
        this.donorFileStreamRouteService = new DonorFileStreamRouteService();

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
    openBankAccountModal(bankAccount) {
        this.formBankAccount.state.options.set({ validateOnChange: false });
        this.formBankAccount.clear();
        this.formBankAccount.state.options.set({ validateOnChange: true });
        this.currentImage = null;
        this.image = null;
        this.attachment = null;
        if (bankAccount) {
            this.formBankAccount.update(bankAccount);
            if (bankAccount.coreMediaVaultEntryId) {
                this.currentImage = this.donorFileStreamRouteService.getPreview(bankAccount.coreMediaVaultEntryId)
            }
        }
        this.bankAccountModal.open({
            formBankAccount: this.formBankAccount
        });
    }

    @action.bound
    async updateBankAccountAsync(entity, message) {
        try {
            await this.bankAccountService.update(entity);
            await this.insertImage(entity.id);

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
            const response = await this.bankAccountService.create({
                donorId: this.donorId,
                ...entity
            });
            await this.insertImage(response.data.response);

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
        if (type === 'address') {
            const primaryAddress = await this.getAddress();
            if (primaryAddress) {
                this.formBankAccount.$('addressLine1').set(primaryAddress.addressLine1)
                this.formBankAccount.$('addressLine2').set(primaryAddress.addressLine2)
                this.formBankAccount.$('city').set(primaryAddress.city)
                this.formBankAccount.$('state').set(primaryAddress.state)
                this.formBankAccount.$('zipCode').set(primaryAddress.zipCode)
            }
        }
        else if (type === 'emailAddress') {
            const primaryEmailAddress = await this.getEmailAddress();
            if (primaryEmailAddress) {
                this.formBankAccount.$('email').set(primaryEmailAddress.email);
            }
        }
        else if (type === 'phoneNumber') {
            const primaryPhoneNumber = await this.getPhoneNumber();
            if (primaryPhoneNumber) {
                this.formBankAccount.$('number').set(primaryPhoneNumber.number)
            }
        }
    }

    async getAddress() {
        const addressService = new DonorAddressService(this.rootStore.application.baasic.apiClient);
        const params = {
            donorId: this.donorId,
            isPrimary: true
        }
        const response = await addressService.find(params);
        return response.data.item[0];
    }

    async getEmailAddress() {
        const emailAddressService = new DonorEmailAddressService(this.rootStore.application.baasic.apiClient);
        const params = {
            donorId: this.donorId,
            isPrimary: true
        }
        const response = await emailAddressService.find(params);
        return response.data.item[0];
    }

    async getPhoneNumber() {
        const phoneNumberService = new DonorPhoneNumberService(this.rootStore.application.baasic.apiClient);
        const params = {
            donorId: this.donorId,
            isPrimary: true
        }
        const response = await phoneNumberService.find(params);
        return response.data.item[0];
    }

    @action.bound
    async insertImage(bankAccountId) {
        if (this.attachment != null) {
            try {
                const service = new DonorFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadDonorBankAccount(this.attachment, this.donorId, bankAccountId);
                this.uploadLoading = false;
                return response.data.id;
            }
            catch (err) {
                this.uploadLoading = false;
                this.rootStore.notificationStore.error('ERROR', err);
            }
        }
        return null;
    }

    @action.bound onAttachmentDrop(item) {
        this.attachment = item.affectedFiles[0].getRawFile();
        const binaryData = [];
        binaryData.push(this.attachment);
        this.image = window.URL.createObjectURL(new Blob(binaryData, { type: this.attachment.type }));
    }

    @action.bound
    async deleteBankAccount(bankAccount) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank account?`,
            async () => {
                bankAccount.isDeleted = true;
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
