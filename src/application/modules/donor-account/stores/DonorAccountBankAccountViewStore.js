import { action, observable } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import {
    BankAccountService,
    AddressService,
    EmailAddressService,
    PhoneNumberService,
    DonorAccountFileStreamRouteService,
    DonorAccountFileStreamService
} from 'common/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/forms';
import _ from 'lodash';

@applicationContext
class DonorAccountBankAccountViewStore extends BaseListViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    addresses = [];
    emailAddresses = [];
    phoneNumbers = [];
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
            routes: {
            },
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.bankAccountService = new BankAccountService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = ['donorAccountBankAccounts',
                            'accountHolder',
                            'accountHolder.address',
                            'accountHolder.emailAddress',
                            'accountHolder.phoneNumber'
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
                    onClick: (bankAccount) => this.routes.edit(bankAccount.id),
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
                        type: 'routing-number',
                        value: '### ### ###' //TODO
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
                    key: 'accountHolder.address',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_ADDRESS_LABEL',
                    format: {
                        type: 'address',
                        value: 'full'
                    }
                },
                {
                    key: 'accountHolder.emailAddress.email',
                    title: 'BANK_ACCOUNT.LIST.COLUMNS.ACCOUNT_HOLDER_EMAIL_ADDRESS_LABEL'
                },
                {
                    key: 'accountHolder.phoneNumber.number',
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
    async updateBankAccountAsync(entity) {
        try {
            await this.bankAccountService.update(entity);
            await this.insertImage(entity.id);

            this.rootStore.notificationStore.success('Resource updated');
            this.bankAccountModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async createBankAccountAsync(entity) {
        try {
            const response = await this.bankAccountService.createDonorAccountBankAccount({
                donorAccountId: this.donorAccountId,
                ...entity
            });
            await this.insertImage(response.data.response);

            this.rootStore.notificationStore.success('Resource created');
            this.bankAccountModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error(err.data.message, err);
        }
    }

    @action.bound
    async useDonorContactInformations(value, type) {
        if (type === 'address') {
            if (this.addresses.length === 0) {
                const addressService = new AddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    embed: ['donorAccountAddresses'],
                    donorAccountId: this.donorAccountId,
                    orderBy: 'donorAccountAddresses.primary',
                    orderDirection: 'desc'
                }
                const response = await addressService.find(params);
                this.addresses.push(...response.data.item);
            }
            if (value === null) {
                this.formBankAccount.$('accountHolder').$('address').clear()
            }
            else {
                if (_.find(this.addresses, { donorAccountAddresses: [{ primary: value }] }))
                    this.formBankAccount.$('accountHolder').$('address').update(_.find(this.addresses, { donorAccountAddresses: [{ primary: value }] }))
            }
        }
        else if (type === 'emailAddress') {
            if (this.emailAddresses.length === 0) {
                const emailAddressService = new EmailAddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    embed: ['donorAccountEmailAddresses'],
                    donorAccountId: this.donorAccountId,
                    orderBy: 'donorAccountEmailAddresses.primary',
                    orderDirection: 'desc'
                }
                const response = await emailAddressService.find(params);
                this.emailAddresses.push(...response.data.item);
            }

            if (value === null) {
                this.formBankAccount.$('accountHolder').$('emailAddress').clear()
            }
            else {
                if (_.find(this.emailAddresses, { donorAccountEmailAddresses: [{ primary: value }] }))
                    this.formBankAccount.$('accountHolder').$('emailAddress').update(_.find(this.emailAddresses, { donorAccountEmailAddresses: [{ primary: value }] }))
            }
        }
        else if (type === 'phoneNumber') {
            if (this.phoneNumbers.length === 0) {
                const phoneNumberService = new PhoneNumberService(this.rootStore.application.baasic.apiClient);
                const params = {
                    embed: ['donorAccountPhoneNumbers'],
                    donorAccountId: this.donorAccountId,
                    orderBy: 'donorAccountPhoneNumbers.primary',
                    orderDirection: 'desc'
                }
                const response = await phoneNumberService.find(params);
                this.phoneNumbers.push(...response.data.item);
            }

            if (value === null) {
                this.formBankAccount.$('accountHolder').$('phoneNumber').clear()
            }
            else {
                if (_.find(this.phoneNumbers, { donorAccountPhoneNumbers: [{ primary: value }] }))
                    this.formBankAccount.$('accountHolder').$('phoneNumber').update(_.find(this.phoneNumbers, { donorAccountPhoneNumbers: [{ primary: value }] }))
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
}

export default DonorAccountBankAccountViewStore;
