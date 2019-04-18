import { action, computed, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountAdministrationCreateForm } from 'modules/donor-account/forms';
import { setRequired, setNonRequired } from 'core/utils';
import _ from 'lodash';

class DonorAccountAdministrationCreateViewStore extends BaseEditViewStore {
    @observable deliveryMethodTypeDropdownStore = null;
    @observable prefixTypeDropdownStore = null;
    @observable accountType = null;
    @observable businessTypeDropwdownStore = null;

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            actions: {
                create: async donorAccount => {
                    donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });
                    if (!donorAccount.isCompany) {
                        donorAccount.companyProfile = null;
                    }
                    return await donorAccountService.create(donorAccount);
                }
            },
            FormClass: DonorAccountAdministrationCreateForm,
            goBack: false,
            onAfterCreate: (response) => console.log(response)
        });
        this.form.$('isCompany').set('value', '');

        this.applicationDefaultSettingLookupService = new LookupService(rootStore.app.baasic.apiClient, 'application-default-setting');
        this.deliveryMethodTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'delivery-method-type');
        this.prefixTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'prefix-type');
        this.accountTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'account-type');
        this.businessTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'business-type');
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setDefaults();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        const applicationDefaultSettingModels = await this.applicationDefaultSettingLookupService.getAll();
        this.applicationDefaultSetting = applicationDefaultSettingModels.data[0];

        const deliveryMethodTypeModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodType = deliveryMethodTypeModels.data;

        const prefixTypeModels = await this.prefixTypeLookupService.getAll();
        this.prefixType = prefixTypeModels.data;

        const accountTypeModels = await this.accountTypeLookupService.getAll();
        this.accountType = accountTypeModels.data;

        const businessTypeModels = await this.businessTypeLookupService.getAll();
        this.businessType = businessTypeModels.data;
    }

    @action.bound async setStores() {
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false,
                placeholder: 'Choose Delivery Method'
            },
            {
                onChange: this.onChangeDeliveryMethod
            },
            this.deliveryMethodType
        );

        this.prefixTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true,
                placeholder: 'Choose Prefix Type'
            },
            {
                onChange: this.onChangePrefixType
            },
            this.prefixType
        );

        this.accountTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: false,
                placeholder: 'Choose Account Type'
            },
            {
                onChange: this.onChangeAccountType
            },
            this.accountType
        );

        this.businessTypeDropwdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true,
                placeholder: 'Choose Business Type'
            },
            {
                onChange: this.onChangeBusinessType
            },
            this.businessType
        );
    }

    @action.bound async onChangeDeliveryMethod(option) {
        this.form.$('deliveryMethodTypeId').set('value', option ? option.id : null);
    }

    @action.bound async onChangePrefixType(option) {
        this.form.$('coreUser.prefixTypeId').set('value', option ? option.id : null);
    }

    @action.bound async onChangeAccountType(accountTypeId) {
        this.form.$('accountTypeId').set('value', accountTypeId);
        await this.setDefaults();
        await this.setAdditionalValidation();
    }

    @action.bound async onChangeBusinessType(option) {
        this.form.$('companyProfile.businessTypeId').set('value', option ? option.id : null);
    }

    @action.bound setDefaults() {
        if (this.form.$('accountTypeId').value === this.basicId) {
            this.form.$('lineOfCredit').set('value', this.applicationDefaultSetting.basicLineOfCreditAmount);
            this.form.$('contributionMinimumInitial').set('value', this.applicationDefaultSetting.basicMinimumInitialContributionAmount);
            this.form.$('contributionMinimumAdditional').set('value', this.applicationDefaultSetting.basicMinimumAdditionalContributionAmount);
            this.form.$('grantMinimumAmount').set('value', this.applicationDefaultSetting.basicMinimumGrantAmount);
            this.form.$('grantFee').set('value', this.applicationDefaultSetting.basicGrantFeePercentage);
            this.form.$('certificateDeduction').set('value', this.applicationDefaultSetting.basicCertificateDeductionPercentage);
            this.form.$('certificateFee').set('value', this.applicationDefaultSetting.basicCertificateFeePercentage);
            this.form.$('deliveryMethodTypeId').set('value', this.applicationDefaultSetting.deliveryMethodTypeId);
        }
        else if (this.form.$('accountTypeId').value === this.premiumId) {
            this.form.$('lineOfCredit').set('value', this.applicationDefaultSetting.premiumLineOfCreditAmount);
            this.form.$('contributionMinimumInitial').set('value', this.applicationDefaultSetting.premiumMinimumInitialContributionAmount);
            this.form.$('contributionMinimumAdditional').set('value', this.applicationDefaultSetting.premiumMinimumAdditionalContributionAmount);
            this.form.$('grantMinimumAmount').set('value', this.applicationDefaultSetting.premiumMinimumGrantAmount);
            this.form.$('grantFee').set('value', this.applicationDefaultSetting.premiumGrantFeePercentage);
            this.form.$('certificateDeduction').set('value', this.applicationDefaultSetting.premiumCertificateDeductionPercentage);
            this.form.$('certificateFee').set('value', this.applicationDefaultSetting.premiumCertificateFeePercentage);
            this.form.$('extraBookletPercentage').set('value', this.applicationDefaultSetting.extraBookletPercentage);
            this.form.$('notificationLimitRemainderAmount').set('value', this.applicationDefaultSetting.premiumNotificationLimitRemainderAmount);
            this.form.$('blankBookletMax').set('value', this.applicationDefaultSetting.blankBookletMaxAmount);
            this.form.$('deliveryMethodTypeId').set('value', this.applicationDefaultSetting.deliveryMethodTypeId);
        }
    }

    @action.bound async setAdditionalValidation() {
        if (this.form.$('accountTypeId').value === this.basicId) {
            this.form.$('extraBookletPercentage').set('rules', setNonRequired(this.form.$('extraBookletPercentage')));
            this.form.$('blankBookletMax').set('rules', setNonRequired(this.form.$('blankBookletMax')));
        }
        else if (this.form.$('accountTypeId').value === this.premiumId) {
            this.form.$('extraBookletPercentage').set('rules', setRequired(this.form.$('extraBookletPercentage')));
            this.form.$('blankBookletMax').set('rules', setRequired(this.form.$('blankBookletMax')));
        }
    }

    @computed get basicId() {
        return this.accountType ? _.find(this.accountType, { abrv: 'basic' }).id : null;
    }

    @computed get premiumId() {
        return this.accountType ? _.find(this.accountType, { abrv: 'premium' }).id : null;
    }
}

export default DonorAccountAdministrationCreateViewStore;