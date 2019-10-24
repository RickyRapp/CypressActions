import { applicationContext } from 'core/utils';
import { action, runInAction, computed } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorAccountCreateForm } from 'application/donor-account/forms';
import { LookupService } from 'common/services';
import { DonorAccountService } from 'application/donor-account/services';
import _ from 'lodash';

const ErrorType = {
    Unique: 0
};

@applicationContext
class DonorAccountCreateViewStore extends BaseEditViewStore {
    accountTypes = null;
    applicationDefaultSetting = null;

    constructor(rootStore) {
        const service = new DonorAccountService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'donor-account',
            autoInit: false,
            id: undefined,
            actions: {
                create: async (item) => {
                    await this.fetch([
                        this.usernameExists(item.coreUser.username),
                        this.fundNameExists(item.fundName)
                    ])
                    if (!this.form.isValid) {
                        throw { type: ErrorType.Unique };
                    }
                    item.coreUser.json = JSON.stringify({ middleName: item.coreUser.middleName, prefixTypeId: item.coreUser.prefixTypeId });
                    return await service.create(item);
                }
            },
            errorActions: {
                onCreateError: ({ type }) => {
                    switch (type) {
                        case ErrorType.Unique:
                            break;
                        default:
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: DonorAccountCreateForm,
        });

        this.rootStore = rootStore;
        this.service = service;

        this.prefixTypeDropdownStore = new BaasicDropdownStore();
        this.deliveryMethodTypeDropdownStore = new BaasicDropdownStore();
        this.accountTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: (accountTypeId) => {
                    this.form.$('blankBookletMax').setRequired(accountTypeId === this.premiumId);
                    this.form.$('extraBookletPercentage').setRequired(accountTypeId === this.premiumId);
                }
            });
        this.howDidYouHearAboutUsDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.donor-account.list'
            )
        }
        else {
            await this.fetch([
                this.fetchPrefixTypes(),
                this.fetchDeliveryMethodTypes(),
                this.fetchAccountTypes(),
                this.fetchHowDidYouHearAboutUsTypes(),
                this.fetchApplicationDefaultSetting()
            ]);

            await this.fetch([
                this.setFormDefaultValues()
            ]);
        }
    }

    @action.bound
    onBlurUsername(event) {
        this.usernameExists(event.target ? event.target.value : null)
    }

    @action.bound
    async usernameExists(username) {
        if (this.form.$('coreUser.username').isValid) {
            try {
                const response = await this.rootStore.application.baasic.membershipModule.user.exists(username);
                if (response.statusCode === 204) {
                    this.form.$('coreUser.username').invalidate('Username already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('coreUser.username').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    onBlurFundName(event) {
        this.fundNameExists(event.target ? event.target.value : null)
    }

    @action.bound
    async fundNameExists(fundName) {
        if (this.form.$('fundName').isValid) {
            try {
                const response = await this.service.fundNameExists(fundName);
                if (response.statusCode === 204) {
                    this.form.$('fundName').invalidate('Fund name already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('fundName').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    async fetchPrefixTypes() {
        this.prefixTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'prefix-type');
        const response = await service.getAll();
        runInAction(() => {
            this.prefixTypeDropdownStore.setItems(response.data);
            this.prefixTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        this.deliveryMethodTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        runInAction(() => {
            this.deliveryMethodTypeDropdownStore.setItems(response.data);
            this.deliveryMethodTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchAccountTypes() {
        this.accountTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'account-type');
        const response = await service.getAll();
        this.accountTypes = response.data;
        runInAction(() => {
            this.accountTypeDropdownStore.setItems(this.accountTypes);
            this.accountTypeDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchHowDidYouHearAboutUsTypes() {
        this.howDidYouHearAboutUsDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'how-did-you-hear-about-us');
        const response = await service.getAll();
        runInAction(() => {
            this.howDidYouHearAboutUsDropdownStore.setItems(response.data);
            this.howDidYouHearAboutUsDropdownStore.setLoading(false);
        });
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async setFormDefaultValues() {
        if (!this.form.$('accountTypeId').value) {
            this.form.$('accountTypeId').set(this.basicId);
            this.accountTypeDropdownStore.onChange(_.find(this.accountTypes, { abrv: 'basic' }))
        }

        this.form.$('deliveryMethodTypeId').set(this.applicationDefaultSetting.deliveryMethodTypeId);

        if (this.form.$('accountTypeId').value === this.basicId) {
            this.form.$('lineOfCredit').set(this.applicationDefaultSetting.basicLineOfCreditAmount);
            this.form.$('contributionMinimumInitial').set(this.applicationDefaultSetting.basicMinimumInitialContributionAmount);
            this.form.$('contributionMinimumAdditional').set(this.applicationDefaultSetting.basicMinimumAdditionalContributionAmount);
            this.form.$('grantMinimumAmount').set(this.applicationDefaultSetting.basicMinimumGrantAmount);
            this.form.$('grantFee').set(this.applicationDefaultSetting.basicGrantFeePercentage);
            this.form.$('certificateDeduction').set(this.applicationDefaultSetting.basicCertificateDeductionPercentage);
            this.form.$('certificateFee').set(this.applicationDefaultSetting.basicCertificateFeePercentage);
        }
        else if (this.form.$('accountTypeId').value === this.premiumId) {
            this.form.$('lineOfCredit').set(this.applicationDefaultSetting.premiumLineOfCreditAmount);
            this.form.$('contributionMinimumInitial').set(this.applicationDefaultSetting.premiumMinimumInitialContributionAmount);
            this.form.$('contributionMinimumAdditional').set(this.applicationDefaultSetting.premiumMinimumAdditionalContributionAmount);
            this.form.$('grantMinimumAmount').set(this.applicationDefaultSetting.premiumMinimumGrantAmount);
            this.form.$('grantFee').set(this.applicationDefaultSetting.premiumGrantFeePercentage);
            this.form.$('certificateDeduction').set(this.applicationDefaultSetting.premiumCertificateDeductionPercentage);
            this.form.$('certificateFee').set(this.applicationDefaultSetting.premiumCertificateFeePercentage);
            this.form.$('extraBookletPercentage').set(this.applicationDefaultSetting.extraBookletPercentage);
            this.form.$('notificationLimitRemainderAmount').set(this.applicationDefaultSetting.premiumNotificationLimitRemainderAmount);
            this.form.$('blankBookletMax').set(this.applicationDefaultSetting.blankBookletMaxAmount);
        }
    }

    @computed get basicId() {
        return _.find(this.accountTypes, { abrv: 'basic' }).id;
    }

    @computed get premiumId() {
        return _.find(this.accountTypes, { abrv: 'premium' }).id;
    }
}

export default DonorAccountCreateViewStore;
