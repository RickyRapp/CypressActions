import { action, computed, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { ContributionService } from 'application/contribution/services';
import { DonorService, DonorBankAccountService, DonorAddressService, DonorEmailAddressService, DonorPhoneNumberService } from 'application/donor/services';
import {
    LookupService,
    DonorFileStreamService
} from 'common/services';
import { DonorBankAccountEditForm } from 'application/donor/forms';
import _ from 'lodash';
import { RoutingNumberService } from 'application/administration/bank/services';

class ContributionBaseViewStore extends BaseEditViewStore {
    donor = null;
    @observable paymentTypes = null;
    @observable donorName = '';
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;

    constructor(rootStore, config) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);

        super(rootStore, config);

        this.donorId = rootStore.routerStore.routerState.params.id;
        this.editId = rootStore.routerStore.routerState.params.editId;
        this.service = service;
        this.bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
        this.bankAccountModal = new ModalParams({});

        this.paymentTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'payment-type');
                    const response = await service.getAll();
                    this.paymentTypes = response.data;
                    return response.data;
                },
                onChange: (paymentTypeId) => {
                    this.onPaymentTypeChange(paymentTypeId);
                    this.form.$('checkNumber').clear();
                    this.form.$('payerInformation').each((field) => { field.set('disabled', false) });
                    this.form.$('bankAccountId').clear();
                    this.bankAccountDropdownStore.onChange();
                }
            });
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        embed: ['accountHolder'],
                        donorId: this.donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const response = await this.bankAccountService.find(params);
                    return response.data.item;
                },
                onChange: (bankAccountId) => {
                    this.onBankAccountChange(bankAccountId)
                    if (bankAccountId) {
                        this.setPayerInfo(_.find(this.bankAccountDropdownStore.items, { id: bankAccountId }).accountHolder);
                    }
                }
            });
    }

    @action.bound
    onPaymentTypeChange(paymentTypeId) {
        this.form.$('bankAccountId').setRequired(paymentTypeId === this.achId);
        this.form.$('checkNumber').setRequired(paymentTypeId === this.checkId);
        this.form.$('financialInstitution').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('accountNumber').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('securityType').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('securitySymbol').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('numberOfShares').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('estimatedValue').setRequired(paymentTypeId === this.stockAndMutualFundsId);
        this.form.$('transactionId').setRequired(paymentTypeId === this.chaseQuickPayId);
    }

    @action.bound
    onBankAccountChange(bankAccountId) {
        if (bankAccountId) {
            this.form.$('payerInformation').each((field) => { field.resetValidation(); field.set('disabled', true) });
        }
        else {
            this.form.$('payerInformation').each((field) => field.set('disabled', false));
        }
    }

    @action.bound
    setFormDefaultRules() {
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');

            this.donorName = this.donor.donorName;
        }
        else {
            const minContribution = this.donor.initialContribution ? this.donor.contributionMinimumAdditionalAmount : this.donor.contributionMinimumInitialAmount;
            this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${minContribution}`);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorId').set(this.donorId);
    }

    @action.bound
    setPayerInfoUsingPrimaryDonorContactInfo() {
        const payer = {
            name: this.donor.donorName,
            ..._.find(this.donor.donorAddresses, { isPrimary: true }),
            ..._.find(this.donor.donorEmailAddresses, { isPrimary: true }),
            ..._.find(this.donor.donorPhoneNumbers, { isPrimary: true })
        }
        this.setPayerInfo(payer)
    }

    @action.bound
    setPayerInfo(payer) {
        this.form.$('payerInformation').clear();
        this.form.$('payerInformation').set(payer);
    }

    @action.bound
    openBankAccountModal() {
        this.formBankAccount = new DonorBankAccountEditForm({
            onSuccess: async (form) => {
                const bankAccount = form.values();
                try {
                    const response = await this.bankAccountService.create({
                        donorId: this.donorId,
                        ...bankAccount
                    });
                    const bankAccountId = response.data;
                    await this.insertImage(bankAccountId);
                    this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                    await this.bankAccountDropdownStore.filterAsync();
                    this.form.$('bankAccountId').set(bankAccountId);
                    this.bankAccountDropdownStore.setValue(_.find(this.bankAccountDropdownStore.items, { id: bankAccountId }))
                    this.setPayerInfo(_.find(this.bankAccountDropdownStore.items, { id: bankAccountId }).accountHolder);
                    this.form.$('payerInformation').each((field) => { field.resetValidation(); field.set('disabled', true) });
                    this.bankAccountModal.close();

                }
                catch (err) {
                    this.rootStore.notificationStore.error("Error", err);
                }
            }
        });

        this.bankAccountModal.open({
            formBankAccount: this.formBankAccount
        });
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
    async fetchDonor() {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorId, {
            embed: [
                'donorAddresses',
                'donorEmailAddresses',
                'donorPhoneNumbers',
                'contributionSettings'
            ],
            fields: [
                'id',
                'donorName',
                'initialContribution',
                'contributionMinimumAdditionalAmount',
                'contributionMinimumInitialAmount',
                'donorAddresses',
                'donorEmailAddresses',
                'donorPhoneNumbers'
            ]
        });
        this.donor = response.data;
    }

    @action.bound
    async useDonorContactInformations(value, type) {
        if (type === 'address') {
            if (!this.primaryAddress) {
                const addressService = new DonorAddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorId: this.donorId,
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
                const emailAddressService = new DonorEmailAddressService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorId: this.donorId,
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
                const phoneNumberService = new DonorPhoneNumberService(this.rootStore.application.baasic.apiClient);
                const params = {
                    donorId: this.donorId,
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

    @computed get achId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'ach' }).id : null;
    }

    @computed get wireTransferId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'wire-transfer' }).id : null;
    }

    @computed get chaseQuickPayId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'chase-quickpay' }).id : null;
    }

    @computed get stockAndMutualFundsId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'stock-and-mutual-funds' }).id : null;
    }

    @computed get checkId() {
        return this.paymentTypes ? _.find(this.paymentTypes, { abrv: 'check' }).id : null;
    }
}

export default ContributionBaseViewStore;
