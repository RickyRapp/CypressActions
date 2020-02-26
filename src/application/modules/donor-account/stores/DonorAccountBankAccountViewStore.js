import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import {
    DonorAccountFileStreamRouteService,
    DonorAccountFileStreamService
} from 'common/services';
import {
    DonorAccountBankAccountService,
    DonorAccountAddressService,
    DonorAccountEmailAddressService,
    DonorAccountPhoneNumberService,
} from 'application/donor-account/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/forms';
import { RoutingNumberService } from 'application/administration/bank/services';

@applicationContext
class DonorAccountBankAccountViewStore extends BaseListViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    primaryAddress = null;
    primaryEmailAddress = null;
    primaryPhoneNumber = null;
    bankAccountService = null;
    donorAccountFileStreamRouteService = null;

    formBankAccount = new DonorAccountBankAccountEditForm({
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

    constructor(rootStore) {
        const donorAccountId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'donor-account-phone-numbers',
            authorization: 'theDonorsFundContactInfoSection',
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.bankAccountService = new DonorAccountBankAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'accountHolder'
                        ];
                        params.donorAccountId = donorAccountId;
                        params.orderBy = 'dateCreated';
                        params.orderDirection = 'desc';
                        const response = await this.bankAccountService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorAccountId = donorAccountId;
        this.bankAccountModal = new ModalParams({});
        this.donorAccountFileStreamRouteService = new DonorAccountFileStreamRouteService();

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.NAME_LABEL',
                    onClick: (bankAccount) => this.openBankAccountModal(bankAccount),
                    authorization: this.authorization.update
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
                        fetch: (id) => { return this.donorAccountFileStreamRouteService.getPreview(id); }
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
                this.currentImage = this.donorAccountFileStreamRouteService.getPreview(bankAccount.coreMediaVaultEntryId)
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
                donorAccountId: this.donorAccountId,
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
    async useDonorContactInformations(value, type) {
        if (type === 'address') {
            if (!this.primaryAddress) {
                const addressService = new DonorAccountAddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorAccountId: this.donorAccountId,
                    isPrimary: true
                }
                const response = await addressService.find(params);
                this.primaryAddress = response.data.item[0];
            }
            if (value === null) {
                this.formBankAccount.$('accountHolder.addressLine1').set('');
                this.formBankAccount.$('accountHolder.addressLine2').set('');
                this.formBankAccount.$('accountHolder.city').set('');
                this.formBankAccount.$('accountHolder.state').set('');
                this.formBankAccount.$('accountHolder.zipCode').set('');
            }
            else {
                if (this.primaryAddress) {
                    this.formBankAccount.$('accountHolder.addressLine1').set(this.primaryAddress.addressLine1)
                    this.formBankAccount.$('accountHolder.addressLine2').set(this.primaryAddress.addressLine2)
                    this.formBankAccount.$('accountHolder.city').set(this.primaryAddress.city)
                    this.formBankAccount.$('accountHolder.state').set(this.primaryAddress.state)
                    this.formBankAccount.$('accountHolder.zipCode').set(this.primaryAddress.zipCode)
                }
            }
        }
        else if (type === 'emailAddress') {
            if (!this.primaryEmailAddress) {
                const emailAddressService = new DonorAccountEmailAddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorAccountId: this.donorAccountId,
                    isPrimary: true
                }
                const response = await emailAddressService.find(params);
                this.primaryEmailAddress = response.data.item[0];
            }

            if (value === null) {
                this.formBankAccount.$('accountHolder.email').set('');
            }
            else {
                if (this.primaryEmailAddress) {
                    this.formBankAccount.$('accountHolder.email').set(this.primaryEmailAddress.email);
                }
            }
        }
        else if (type === 'phoneNumber') {
            if (!this.primaryPhoneNumber) {
                const phoneNumberService = new DonorAccountPhoneNumberService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorAccountId: this.donorAccountId,
                    isPrimary: true
                }
                const response = await phoneNumberService.find(params);
                this.primaryPhoneNumber = response.data.item[0];
            }

            if (value === null) {
                this.formBankAccount.$('accountHolder.number').set('');
            }
            else {
                if (this.primaryPhoneNumber) {
                    this.formBankAccount.$('accountHolder.number').set(this.primaryPhoneNumber.number)
                }
            }
        }
    }

    @action.bound
    async insertImage(bankAccountId) {
        if (this.attachment != null) {
            try {
                const service = new DonorAccountFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadDonorAccountBankAccount(this.attachment, this.donorAccountId, bankAccountId);
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

export default DonorAccountBankAccountViewStore;
