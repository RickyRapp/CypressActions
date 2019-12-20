import { action, computed, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { ContributionService } from 'application/contribution/services';
import { DonorAccountService, DonorAccountBankAccountService } from 'application/donor-account/services';
import {
    LookupService,
    DonorAccountFileStreamService
} from 'common/services';
import { DonorAccountBankAccountEditForm } from 'application/donor-account/forms';
import _ from 'lodash';

class ContributionBaseViewStore extends BaseEditViewStore {
    donorAccount = null;
    @observable paymentTypes = null;
    @observable donorName = '';
    uploadTypes = null;
    @observable image = null;
    @observable currentImage = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];

    constructor(rootStore, config) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);

        super(rootStore, config);

        this.donorAccountId = rootStore.routerStore.routerState.params.id;
        this.editId = rootStore.routerStore.routerState.params.editId;
        this.service = service;
        this.bankAccountService = new DonorAccountBankAccountService(rootStore.application.baasic.apiClient);
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
                        donorAccountId: this.donorAccountId,
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

            this.donorName = this.donorAccount.donorName;
        }
        else {
            const minContribution = this.donorAccount.initialContribution ? this.donorAccount.contributionMinimumAdditionalAmount : this.donorAccount.contributionMinimumInitialAmount;
            this.form.$('amount').set('rules', this.form.$('amount').rules + `|min:${minContribution}`);
        }
    }

    @action.bound
    setFormDefaultValues() {
        this.form.$('donorAccountId').set(this.donorAccountId);
    }

    @action.bound
    setPayerInfoUsingPrimaryDonorContactInfo() {
        const payer = {
            name: this.donorAccount.donorName,
            ..._.find(this.donorAccount.donorAccountAddresses, { isPrimary: true }),
            ..._.find(this.donorAccount.donorAccountEmailAddresses, { isPrimary: true }),
            ..._.find(this.donorAccount.donorAccountPhoneNumbers, { isPrimary: true })
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
        const formBankAccount = new DonorAccountBankAccountEditForm({
            onSuccess: async (form) => {
                const bankAccount = form.values();
                try {
                    const response = await this.bankAccountService.create({
                        donorAccountId: this.donorAccountId,
                        ...bankAccount
                    });
                    await this.insertImage(response.data.response);
                    this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                    await this.bankAccountDropdownStore.filterAsync();
                    this.form.$('bankAccountId').set(response.data.response);
                    this.bankAccountDropdownStore.setValue(_.find(this.bankAccountDropdownStore.items, { id: response.data.response }))
                    this.setPayerInfo(_.find(this.bankAccountDropdownStore.items, { id: response.data.response }).accountHolder);
                    this.form.$('payerInformation').each((field) => { field.resetValidation(); field.set('disabled', true) });
                    this.bankAccountModal.close();

                }
                catch (err) {
                    this.rootStore.notificationStore.error("Error", err);
                }
            }
        });

        this.bankAccountModal.open({
            formBankAccount: formBankAccount
        });
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
    async fetchDonorAccount() {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(this.donorAccountId, {
            embed: [
                'donorAccountAddresses',
                'donorAccountEmailAddresses',
                'donorAccountPhoneNumbers',
                'contributionSettings'
            ],
            fields: [
                'id',
                'donorName',
                'initialContribution',
                'contributionMinimumAdditionalAmount',
                'contributionMinimumInitialAmount',
                'donorAccountAddresses',
                'donorAccountEmailAddresses',
                'donorAccountPhoneNumbers'
            ]
        });
        this.donorAccount = response.data;
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
