import { action, observable, computed } from 'mobx';
import { ContributionCreateForm, ContributionEditForm } from 'modules/contribution/forms';
import { ContributionService, ContributionSettingService, BankAccountService, LookupService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ModalParams } from 'core/models';
import moment from 'moment';
import _ from 'lodash';

class ContributionCreateViewStore extends BaseEditViewStore {
    @observable paymentTypes = null;
    @observable bankAccounts = null;
    @observable donorAccount = null;
    @observable showPayerInformation = false;
    @observable showStockAndMutualFundsContactInfo = false;
    @observable paymentTypeDropdownStore = null;
    @observable bankAccountDropdownStore = null;
    @observable contributionSettingType = null;
    @observable contributionStatuses = null;
    @observable makeAsRecurringPayment = false;
    @observable usedSettingTypeIds = null;
    contribution = null;

    constructor(rootStore) {
        const contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        const contributionSettingService = new ContributionSettingService(rootStore.app.baasic.apiClient);

        let userId = rootStore.routerStore.routerState.params.userId;
        let contributionId = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'contribution',
            id: contributionId,
            actions: {
                create: async newContribution => {
                    let contributionCreate = false;
                    let response = null;
                    try {
                        response = await contributionService.createContribution(userId, newContribution)
                        contributionCreate = true;

                        if (this.makeAsRecurringPayment) {
                            const contributionSetting = {
                                amount: this.form.$('settingAmount').value,
                                bankAccountId: this.form.$('settingBankAccountId').value,
                                contributionSettingTypeId: this.form.$('contributionSettingTypeId').value,
                                startDate: this.form.$('settingStartDate').value,
                                enabled: this.form.$('settingEnabled').value,
                                lowBalanceAmount: this.form.$('settingLowBalanceAmount').value,
                            }

                            const responseSetting = await contributionSettingService.createContributionSetting(this.userId, contributionSetting);
                            this.rootStore.notificationStore.showMessageFromResponse(responseSetting, 6000);
                        }

                        return response;
                    } catch (errorResponse) {
                        if (contributionCreate) {
                            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
                            return response;
                        }
                        return errorResponse;
                    }
                },
                update: async contribution => {
                    try {

                        return await contributionService.update({ id: contributionId, ...contribution })
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                },
                get: async id => {
                    let params = {};
                    params.embed = ['payerInformation,address,emailAddress,phoneNumber,paymentType,bankAccount,createdByCoreUser,contributionStatus'];
                    let model = await contributionService.get(id, params);
                    if (model.json && JSON.parse(model.json).paymentTypeInformations) {
                        _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                            model[key] = value;
                        });
                    }
                    this.contribution = model;
                    return this.contribution;
                }
            },
            FormClass: contributionId ? ContributionEditForm : ContributionCreateForm,
            autoInit: false //need to load all lookups and donors data before contribution
        });

        this.userId = userId;
        this.rootStore = rootStore;

        const employeeCreate = rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.create');
        const employeeUpdate = rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.update');
        this.permissions = {
            employeeCreate: employeeCreate,
            employeeUpdate: employeeUpdate,
        }

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
            this.onChangeBankAccount({ id: lastBankAccount.bankAccount.id, name: lastBankAccount.bankAccount.name });
        }

        this.onAfterReviewContribution = async (val) => {
            this.reviewContributionModalParams.close();
            this.rootStore.routerStore.navigate('master.app.administration.contribution.list')
        }

        this.load();
    }

    @action.bound async load() {
        if (this.isEdit) {
            await this.initialize();
            if (moment().local().isAfter(moment.utc(this.item.dateCreated, 'YYYY-MM-DD HH:mm:ss').local().add(15, 'minutes')) && !this.permissions.employeeUpdate) {
                this.rootStore.routerStore.navigate('master.app.main.contribution.list')
            }
        }

        await this.loadLookups();

        await this.getDonorAccount();
        await this.getBankAccounts();
        await this.setStores();
        this.setAdditionalFieldValidation();
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
            _.map(this.bankAccounts, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } })
        );

        if (!this.edit) {
            this.bankAccountSettingDropdownStore = new BaasicDropdownStore(
                {
                    multi: false,
                    placeholder: 'Choose Bank Account',
                    name: 'BankAccount',
                    textField: 'name',
                    dataItemKey: 'id',
                    isClearable: false
                },
                {
                    onChange: this.onChangeSettingBankAccount
                },
                _.map(this.bankAccounts, e => { return { 'id': e.bankAccount.id, 'name': e.bankAccount.name } })
            );

            let availableContributionSettingType = [];
            if (this.donorAccount.contributionSettings) {
                this.usedSettingTypeIds = _.map(this.donorAccount.contributionSettings, function (x) { return x.contributionSettingTypeId; });
                let usedSettingTypeIds = this.usedSettingTypeIds;
                _.forEach(this.contributionSettingType, function (x) {
                    if (!_.includes(usedSettingTypeIds, x.id)) {
                        availableContributionSettingType.push(x);
                    }
                });
            }

            this.contributionSettingTypeDropdownStore = new BaasicDropdownStore(
                {
                    multi: false,
                    placeholder: 'Choose Setting',
                    name: 'ContributionSettingTypeId',
                    textField: 'name',
                    dataItemKey: 'id',
                    isClearable: true
                },
                {
                    onChange: this.onChangeContributionSetting
                },
                availableContributionSettingType
            );
        }
    }

    @action.bound async onChangePaymentType(option) {
        if (option && option.id && option.name) {
            this.form.$('paymentTypeId').set('value', option.id);
        }
        this.form.$('checkNumber').clear();
        this.form.$('bankAccountId').clear();
        this.form.$('payerInformation').clear();
        this.form.$('payerInformation').each(field => field.set('disabled', false));

        this.form.$('bankAccountId').set('rules', 'string');
        this.form.$('checkNumber').set('rules', 'string');
        this.form.$('financialInstitution').set('rules', 'string');
        this.form.$('accountNumber').set('rules', 'string');
        this.form.$('securityType').set('rules', 'string');
        this.form.$('numberOfShares').set('rules', 'numeric|min:0');
        this.form.$('estimatedValue').set('rules', 'numeric|min:10000');
        this.form.$('securitySymbol').set('rules', 'string');
        this.form.$('transactionId').set('rules', 'string');

        if (option && option.id === this.achId) {
            this.form.$('bankAccountId').set('rules', 'required|string');
        }
        else {
            if (option && option.id === this.checkId) {
                this.form.$('checkNumber').set('rules', 'required|string');
            }
            else if (option && option.id === this.stockAndMutualFundsId) {
                this.form.$('financialInstitution').set('rules', 'required|string');
                this.form.$('accountNumber').set('rules', 'required|string');
                this.form.$('securityType').set('rules', 'required|string');
                this.form.$('numberOfShares').set('rules', 'required|numeric|min:0');
                this.form.$('estimatedValue').set('rules', 'required|numeric|min:10000');
                this.form.$('securitySymbol').set('rules', 'required|string');
            }
            else if (option && option.id === this.chaseQuickPayId) {
                this.form.$('transactionId').set('rules', 'required|string');
            }
            this.setDefaultPayerInformations();
        }
    }

    @action.bound async onChangeBankAccount(option) {
        if (option && option.id) {
            this.form.$('bankAccountId').set('value', option.id);
            let donorBankAccount = _.find(this.bankAccounts, function (donorBankAccount) { return (donorBankAccount.bankAccount.id === option.id) });
            this.form.$('payerInformation').set('value', donorBankAccount.bankAccount.accountHolder);
            this.form.$('payerInformation').each(field => field.resetValidation());
            this.form.$('payerInformation').each(field => field.set('disabled', true));
        }
        else {
            this.form.$('bankAccountId').clear();
            this.form.$('payerInformation').clear();
            this.form.$('payerInformation').each(field => field.set('disabled', false));

            if (this.form.$('paymentTypeId').value === this.wireTransferId) {
                this.setDefaultPayerInformations();
            }
        }
    }

    @action.bound async onChangeShowPayerInformation(event) {
        this.showPayerInformation = event.target.checked;
    }

    @action.bound async onChangeShowStockAndMutualFundsContactInfo(event) {
        this.showStockAndMutualFundsContactInfo = event.target.checked;
    }

    @action.bound async onChangeMakeAsRecurringPayment(event) {
        this.makeAsRecurringPayment = event.target.checked;

        if (this.makeAsRecurringPayment) {
            this.form.$('settingAmount').set('rules', 'required|numeric|min:0');
            this.form.$('settingBankAccountId').set('rules', 'required|string');
            this.form.$('contributionSettingTypeId').set('rules', 'required|string');

            this.form.$('settingBankAccountId').set('value', this.form.$('bankAccountId').value);
            this.form.$('settingAmount').set('value', this.form.$('amount').value);
        }
        else {
            this.form.$('settingAmount').set('rules', 'numeric|min:0');
            this.form.$('settingBankAccountId').set('rules', 'string');
            this.form.$('contributionSettingTypeId').set('rules', 'string');
            this.form.$('settingLowBalanceAmount').set('rules', 'numeric');
            this.form.$('settingStartDate').set('rules', 'date');
        }
    }

    @action.bound async onChangeSettingBankAccount(option) {
        this.form.$('settingBankAccountId').set('value', option ? option.id : null);
    }

    @action.bound async onChangeContributionSetting(option) {
        if (option && option.id) {
            this.form.$('contributionSettingTypeId').set('value', option.id);
            if (option.abrv === 'low-balance') {
                this.form.$('settingLowBalanceAmount').set('rules', 'required|numeric');
                this.form.$('settingStartDate').set('rules', 'date');
            }
            else {
                this.form.$('settingLowBalanceAmount').set('rules', 'numeric');
                this.form.$('settingStartDate').set('rules', 'required|date|after_override:' + moment(new Date).add(1, 'days').format('MM/DD/YYYY'));
            }
        }
        else {
            this.form.$('contributionSettingTypeId').clear();
        }
    }

    @action.bound async getDonorAccount() {
        this.donorAccountService = new DonorAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = ['coreUser,donorAccountAddresses,donorAccountEmailAddresses,donorAccountPhoneNumbers,address,emailAddress,phoneNumber,contributionSettings'];
        this.donorAccount = await this.donorAccountService.get(this.userId, params)
    }

    @action.bound async getBankAccounts() {
        this.bankAccountService = new BankAccountService(this.rootStore.app.baasic.apiClient);
        let params = {};
        params.embed = 'bankAccount,accountHolder,address,emailAddress,phoneNumber'
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        this.bankAccounts = await this.bankAccountService.getDonorAccountCollection(this.userId, params);
    }

    @action.bound async loadLookups() {
        this.paymentTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'payment-type');
        let paymentTypesModels = await this.paymentTypeLookupService.getAll();
        this.paymentTypes = _.orderBy(paymentTypesModels.data, ['sortOrder'], ['asc']);


        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let contributionStatusModels = await this.contributionStatusLookupService.getAll();
        this.contributionStatuses = _.orderBy(contributionStatusModels.data, ['sortOrder'], ['asc']);

        if (!this.isEdit) {
            let contributionSettingTypeLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-setting-type');
            let contributionSettingTypeModels = await contributionSettingTypeLookupService.getAll();
            this.contributionSettingType = _.orderBy(contributionSettingTypeModels.data, ['sortOrder'], ['asc']);
        }
    }

    @action.bound setAdditionalFieldValidation() {
        let minimumAmount = 0;
        if (!this.permissions.employeeCreate && !this.permissions.employeeUpdate) {
            if (this.donorAccount.initialContribution) {
                minimumAmount = this.donorAccount.contributionMinimumAdditional;
            }
            else {
                minimumAmount = this.donorAccount.contributionMinimumInitial;
            }
        }
        this.form.$('amount').set('rules', `required|numeric|min:${minimumAmount}`);

        if (this.edit) {
            if (this.form.$('paymentTypeId').value === this.achId) {
                this.form.$('bankAccountId').set('rules', 'required|string');
            }
            else if (this.form.$('paymentTypeId').value === this.checkId) {
                this.form.$('checkNumber').set('rules', 'required|string');
            }

            if (this.form.$('bankAccountId').value) {
                this.form.$('payerInformation').each(field => field.set('disabled', true));
            }
        }
    }

    @action async setDefaultPayerInformations() {
        this.form.$('payerInformation.firstName').set('value', this.donorAccount.coreUser.firstName);
        this.form.$('payerInformation.lastName').set('value', this.donorAccount.coreUser.lastName);
        this.form.$('payerInformation.address').set('value', _.find(this.donorAccount.donorAccountAddresses, { primary: true }).address);
        this.form.$('payerInformation.emailAddress').set('value', _.find(this.donorAccount.donorAccountEmailAddresses, { primary: true }).emailAddress);
        this.form.$('payerInformation.phoneNumber').set('value', _.find(this.donorAccount.donorAccountPhoneNumbers, { primary: true }).phoneNumber);
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

    @computed get isPayerInformationValid() {
        if (this.form) {
            let valid = true;
            this.form.$('payerInformation').each(field => {
                if (field.error) {
                    valid = false;
                    return false;
                }
            });
            return valid;
        }
        return false;
    }
}

export default ContributionCreateViewStore;
