import { applicationContext, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { action } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorCreateForm } from 'application/administration/donor/forms';
import { localizationService, validatorService } from 'core/services';

@applicationContext
class DonorCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor',
            id: undefined,
            actions: {
                create: async (resource) => {
                    debugger
                    resource.dateOfBirth = new Date(Date.UTC(resource.dateOfBirth.getFullYear(), resource.dateOfBirth.getMonth(), resource.dateOfBirth.getDate()));
                    const applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find()
                    const model = {
                        activationUrl: `${window.location.origin}/app/account-activation/?activationToken={activationToken}`,
                        firstName: resource.firstName,
                        lastName: resource.lastName,
                        dateOfBirth: resource.dateOfBirth,
                        fundName: resource.fundName,
                        howDidYouHearAboutUsDescription: resource.howDidYouHearAboutUsDescription,
                        howDidYouHearAboutUsId: resource.howDidYouHearAboutUsId,
                        securityPin: resource.securityPin,
                        confirmSecurityPin: resource.securityPin,
                        lineOfCredit: applicationDefaultSetting.regularLineOfCreditAmount,
                        contributionMinimumInitialAmount: applicationDefaultSetting.regularMinimumInitialContributionAmount,
                        contributionMinimumAdditionalAmount: applicationDefaultSetting.regularMinimumAdditionalContributionAmount,
                        grantFeePercentage: applicationDefaultSetting.regularGrantFeePercentage,
                        extraBookletPercentage: applicationDefaultSetting.extraBookletPercentage,
                        notificationLimitRemainderAmount: applicationDefaultSetting.regularNotificationLimitRemainderAmount,
                        blankBookletMaxAmount: applicationDefaultSetting.blankBookletMaxAmount,
                        isApproved: resource.isApproved,
                        sendApproveEmail: resource.sendApproveEmail,
                        address: {
                            addressLine1: resource.addressLine1,
                            addressLine2: resource.addressLine2,
                            city: resource.city,
                            state: resource.state,
                            zipCode: resource.zipCode,
                            decription: resource.addressDescription
                        },
                        emailAddress: {
                            email: resource.email,
                            decription: resource.emailAddressDescription
                        },
                        phoneNumber: {
                            number: resource.number,
                            decription: resource.phoneNumberDescription
                        }
                    }

                    if (!isNullOrWhiteSpacesOrUndefinedOrEmpty(resource.username)) {
                        model.coreUser = {
                            userName: resource.username,
                            coreMembership: {
                                password: resource.password,
                                confirmPassword: resource.confirmPassword
                            }
                        }
                    }
                    await this.rootStore.application.administration.donorStore.createAccount(model);
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
            try {
                debugger
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
                debugger
                const { statusCode } = await this.rootStore.application.administration.donorStore.fundNameExists(value);
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
