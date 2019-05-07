import { action, observable, computed } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { ContributionEditFormFields } from 'modules/common/contribution/forms';
import { ModalParams } from 'core/models';
import { FormBase } from 'core/components';
import _ from 'lodash';

class ContributionEditViewStore extends BaseViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionStatuses = null;
    @observable form = null;
    contribution = null;

    constructor(rootStore) {
        super(rootStore);

        this.rootStore = rootStore;
        this.contributionId = rootStore.routerStore.routerState.params.id;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        this.addBankAccountModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewContributionModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAddBankAccount = async () => {
            this.addBankAccountModalParams.close();
            await this.getBankAccounts();
            await this.setStores();
            let lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.onChangeBankAccount({ id: lastBankAccount.id, name: lastBankAccount.name });
        }

        this.onAfterReviewContribution = async (val) => {
            this.reviewContributionModalParams.close();
            this.load();
        }

        this.load();
    }

    @action.bound async load() {
        if (!this.loaderStore.loading) this.loaderStore.suspend();
        await this.loadLookups();
        await this.initialize();
        if (!(this.contribution.contributionStatusId === this.pendingId || this.contribution.contributionStatusId === this.inProcessId)) {
            this.rootStore.routerStore.navigate('master.app.administration.contribution.list')
        }
        await this.getDonorAccount();
        await this.initializeForm();
        await this.getBankAccounts();
        await this.setStores();
        this.form.$('payerInformation').each(field => field.set('disabled', this.form.$('bankAccountId').value !== ''));
        this.loaderStore.resume();
    }

    @action.bound async initialize() {
        let params = {};
        params.embed = ['payerInformation,address,emailAddress,phoneNumber,paymentType,bankAccount,createdByCoreUser,contributionStatus'];
        let model = await this.contributionService.get(this.contributionId, params);
        if (model.json && JSON.parse(model.json).paymentTypeInformations) {
            _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                model[key] = value;
            });
        }
        this.contribution = model;
    }

    @action.bound async initializeForm() {
        const fields = ContributionEditFormFields(this.contribution, this.achId, this.checkId, this.chaseQuickPayId, this.stockAndMutualFundsId, 0, this.donorAccount);
        this.form = new FormBase({
            onSuccess: async (form) => {
                this.loaderStore.suspend();
                const item = form.values();
                try {
                    const response = await this.contributionService.update({ id: this.contributionId, ...item });
                    this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
                    await this.load();
                } catch (errorResponse) {
                    this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                }
            }
        }, fields);
        this.form.$('bankAccountId').observe(({ form, field, change }) => { form.$('payerInformation').each(field => field.set('disabled', form.$('bankAccountId').value !== '')) })
    }

    @action.bound async setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
                name: 'PaymentType',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: this.onChangePaymentType
            },
            this.paymentTypes
        );
        this.paymentTypeDropdownStore._value = this.form.$('paymentTypeId').value;

        this.bankAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                name: 'BankAccount',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: this.onChangeBankAccount
            },
            _.map(this.bankAccounts, e => { return { 'id': e.id, 'name': e.name } })
        );
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('bankAccountId').clear();
        this.form.$('payerInformation').reset();
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let bankAccount = _.find(this.bankAccounts, function (bankAccount) { return (bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', bankAccount.thirdPartyAccountHolder);
        }
        else {
            this.form.$('bankAccountId').clear();
            if (this.form.$('paymentTypeId').value === this.wireTransferId) {
                this.form.$('payerInformation').reset();
            }
        }
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async getDonorAccount() {
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber,contributionSettings'];
        this.donorAccount = await this.donorAccountService.get(this.contribution.donorAccountId, params)
    }

    @action.bound async getBankAccounts() {
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = 'thirdPartyAccountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        params.donorAccountId = this.contribution.donorAccountId;
        const response = await this.bankAccountService.find(params);
        this.bankAccounts = response.item;
    }

    @action.bound async loadLookups() {
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let paymentTypesModels = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(paymentTypesModels.data, ['sortOrder'], ['asc']);

        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);
    }

    @computed get pendingId() {
        return this.contributionStatuses ? _.find(this.contributionStatuses, { abrv: 'pending' }).id : null;
    }

    @computed get inProcessId() {
        return this.contributionStatuses ? _.find(this.contributionStatuses, { abrv: 'in-process' }).id : null;
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

export default ContributionEditViewStore;