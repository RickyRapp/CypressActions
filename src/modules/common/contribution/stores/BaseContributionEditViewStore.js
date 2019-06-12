import { action, observable, computed, reaction } from 'mobx';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import moment from 'moment';
import _ from 'lodash';

class BaseContributionEditViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionStatuses = null;
    @observable contribution = null;

    additionalActions = {};

    constructor(rootStore, config) {
        super(rootStore, config.editViewStore);

        this.rootStore = rootStore;
        this.userId = config.userId;
        this.contributionId = rootStore.routerStore.routerState.params.id;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);

        this.addBankAccountModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.onAddBankAccount = async () => {
            this.addBankAccountModalParams.close();
            await this.getBankAccounts();
            await this.setStores();
            let lastBankAccount = _.orderBy(this.bankAccounts, ['dateCreated'], ['desc'])[0];
            this.onChangeBankAccount({ id: lastBankAccount.id, name: lastBankAccount.name });
        }
    }

    async getResource(id, updateForm = true) {
        await super.getResource(id, updateForm);
        await this.load();
        if (await this.validateBeforeEditing()) {
            await this.setFormDefaults();
            if (this.additionalActions) {
                if (_.isFunction(this.additionalActions.additionalValidateBeforeEditing)) {
                    this.additionalActions.additionalValidateBeforeEditing();
                }
                if (_.isFunction(this.additionalActions.additionalSetFormDefaults)) {
                    this.additionalActions.additionalSetFormDefaults();
                }
            }
        }
    }

    @action.bound async load() {
        await this.fetch([
            this.loadLookups(),
            this.getBankAccounts(),
        ]);
        this.setStores();
        this.form.$('payerInformation').each(field => {
            field.resetValidation();
            field.set('disabled', this.form.$('bankAccountId').value && this.form.$('bankAccountId').value !== '')
        });
    }

    @action.bound async loadLookups() {
        let paymentTypesModels = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(paymentTypesModels.data, ['sortOrder'], ['asc']);

        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);
    }

    @action.bound async getBankAccounts() {
        let params = {};
        params.embed = 'bankAccount,thirdPartyAccountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        params.donorAccountId = this.userId;
        this.bankAccounts = (await this.bankAccountService.find(params)).item;
    }

    @action.bound async syncBankAccounts() {
        await this.getBankAccounts();
        debugger;
        let selectedBankAccount = _.find(this.bankAccounts, { id: this.form.$('bankAccountId').value });
        if (selectedBankAccount)
            this.onChangeBankAccount({ id: selectedBankAccount.id, name: selectedBankAccount.name });
        this.rootStore.notificationStore.success('Bank Accounts Synced.');
    }

    @action.bound setStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false
            },
            {
                onChange: this.onChangePaymentType
            },
            this.paymentTypes
        );

        this.bankAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Bank Account',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: this.onChangeBankAccount
            },
            _.map(this.bankAccounts, e => { return { id: e.id, name: e.name } })
        );
    }

    @action.bound setFormDefaults() {
        if (this.contribution) {
            //Rules
            this.form.$('bankAccountId').set('rules', this.form.$('bankAccountId').rules + `|required_if:paymentTypeId,${this.achId}`);
            this.form.$('checkNumber').set('rules', this.form.$('checkNumber').rules + `|required_if:paymentTypeId,${this.checkId}`);
            this.form.$('financialInstitution').set('rules', this.form.$('financialInstitution').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('accountNumber').set('rules', this.form.$('accountNumber').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('securityType').set('rules', this.form.$('securityType').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('securitySymbol').set('rules', this.form.$('securitySymbol').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('numberOfShares').set('rules', this.form.$('numberOfShares').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('estimatedValue').set('rules', this.form.$('estimatedValue').rules + `|required_if:paymentTypeId,${this.stockAndMutualFundsId}`);
            this.form.$('transactionId').set('rules', this.form.$('transactionId').rules + `|required_if:paymentTypeId,${this.chaseQuickPayId}`);

            //Default Values
            this.form.$('payerInformation.firstName').set('default', this.contribution.donorAccount.coreUser.firstName);
            this.form.$('payerInformation.lastName').set('default', this.contribution.donorAccount.coreUser.lastName);
            this.form.$('payerInformation.address').set('default', _.find(this.contribution.donorAccount.donorAccountAddresses, { primary: true }).address);
            this.form.$('payerInformation.emailAddress').set('default', _.find(this.contribution.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
            this.form.$('payerInformation.phoneNumber').set('default', _.find(this.contribution.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);
        }
    }

    @action.bound async validateBeforeEditing() {
        if (!(this.contribution.contributionStatusId === this.pendingId || this.contribution.contributionStatusId === this.inProcessId)) {
            await this.rootStore.routerStore.goBack();
            this.rootStore.notificationStore.warning('Contribution Can be Edited Only In Pending Or In Process Status.');
            return false;
        }
        return true;
    }

    @action.bound onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        this.form.$('bankAccountId').clear();
    }

    @action.bound onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', donorBankAccount.thirdPartyAccountHolder);
            this.form.$('payerInformation').each(field => {
                field.resetValidation();
                field.set('disabled', true)
            });
        }
        else {
            this.form.$('bankAccountId').clear();
            this.form.$('payerInformation').each(field => { field.reset(); field.set('disabled', false) });
        }
    }

    @action.bound onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
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


export default BaseContributionEditViewStore;