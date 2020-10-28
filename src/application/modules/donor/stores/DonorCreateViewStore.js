import { applicationContext, isNullOrUndefinedOrEmpty } from 'core/utils';
import { action } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorCreateForm } from 'application/donor/forms';
import { localizationService, validatorService } from 'core/services';

@applicationContext
class DonorCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor',
            id: undefined,
            actions: {
                create: async (item) => {
                    item.dateOfBirth = new Date(Date.UTC(item.dateOfBirth.getFullYear(), item.dateOfBirth.getMonth(), item.dateOfBirth.getDate()));
                    const applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find()
                    const model = {
                        activationUrl: `${window.location.origin}/app/account-activation/?activationToken={activationToken}`,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        dateOfBirth: item.dateOfBirth,
                        fundName: item.fundName,
                        howDidYouHearAboutUsDescription: item.howDidYouHearAboutUsDescription,
                        howDidYouHearAboutUsId: item.howDidYouHearAboutUsId,
                        securityPin: item.securityPin,
                        lineOfCredit: applicationDefaultSetting.regularLineOfCreditAmount,
                        contributionMinimumInitialAmount: applicationDefaultSetting.regularMinimumInitialContributionAmount,
                        contributionMinimumAdditionalAmount: applicationDefaultSetting.regularMinimumAdditionalContributionAmount,
                        grantFeePercentage: applicationDefaultSetting.regularGrantFeePercentage,
                        extraBookletPercentage: applicationDefaultSetting.extraBookletPercentage,
                        notificationLimitRemainderAmount: applicationDefaultSetting.regularNotificationLimitRemainderAmount,
                        blankBookletMaxAmount: applicationDefaultSetting.blankBookletMaxAmount,
                        address: {
                            addressLine1: item.addressLine1,
                            addressLine2: item.addressLine2,
                            city: item.city,
                            state: item.state,
                            zipCode: item.zipCode,
                            decription: item.addressDescription
                        },
                        emailAddress: {
                            email: item.email,
                            decription: item.emailAddressDescription
                        },
                        phoneNumber: {
                            number: item.number,
                            decription: item.phoneNumberDescription
                        }
                    }

                    if (!isNullOrUndefinedOrEmpty(item.username)) {
                        model.coreUser = {
                            userName: item.username,
                            coreMembership: {
                                password: item.password,
                                confirmPassword: item.confirmPassword
                            }
                        }
                    }
                    await this.rootStore.application.donor.donorStore.createAccount(model);
                }
            },
            FormClass: DonorCreateForm,
        });

        this.createPrefixTypeDropdownStore();
        this.createHowDidYouHearAboutUsDropdownStore();
        this.createUniqueConstraintValidators();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.resume();
        }
    }

    createPrefixTypeDropdownStore() {
        this.prefixTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.prefixTypeStore.find();
                }
            });
    }

    createHowDidYouHearAboutUsDropdownStore() {
        this.howDidYouHearAboutUsDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.howDidYouHearAboutUsStore.find();
                }
            });
    }

    createUniqueConstraintValidators() {
        validatorService.registerAsyncValidator('usernameUnique', async (value, attribute, req, passes) => {
            console.log(this)
            try {
                const { statusCode } = await this.rootStore.application.baasic.membershipModule.user.exists(value);
                if (statusCode === 204) {
                    return passes(false, localizationService.t('DONOR.CREATE.LOGIN_FORM_FIELDS.ERROR_MESSAGES.USERNAME_CONFLICT'))
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    return passes();
                }
                return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });

        validatorService.registerAsyncValidator('fundNameUnique', async (value, attribute, req, passes) => {
            try {
                const { statusCode } = await this.rootStore.application.donor.donorStore.fundNameExists(value);
                if (statusCode === 204) {
                    return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.FUND_NAME_CONFLICT'))
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    return passes();
                }
                return passes(false, localizationService.t('DONOR.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });
    }
}

export default DonorCreateViewStore;
