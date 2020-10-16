import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorCreateForm } from 'application/donor/forms';
import { DonorService } from 'application/donor/services';

const ErrorType = {
    Unique: 0
};

@applicationContext
class DonorCreateViewStore extends BaseEditViewStore {
    @observable loginShow = false;

    constructor(rootStore) {
        const service = new DonorService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'donor',
            id: undefined,
            actions: {
                create: async (item) => {

                    await this.fetch([
                        this.usernameExists(item.username),
                        this.fundNameExists(item.fundName)
                    ])

                    if (item.username || item.password || item.confirmPassword) {
                        if (!item.username) {
                            this.form.$('username').invalidate('The Username is required if you want create online account.')
                        }
                        if (!item.password) {
                            this.form.$('password').invalidate('The Password is required if you want create online account.')
                        }
                        if (!item.confirmPassword) {
                            this.form.$('confirmPassword').invalidate('The Confirm password is required if you want create online account.')
                        }
                    }
                    else {
                        item.username = null;
                    }
                    if (!this.form.isValid) {
                        throw { type: ErrorType.Unique };
                    }

                    item.json = JSON.stringify({ prefixTypeId: item.prefixTypeId });
                    item.dateOfBirth = new Date(Date.UTC(item.dateOfBirth.getFullYear(), item.dateOfBirth.getMonth(), item.dateOfBirth.getDate()));

                    const applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find()

                    const model = {
                        activationUrl: `${window.location.origin}/app/account-activation/?activationToken={activationToken}`,
                        dateOfBirth: item.dateOfBirth,
                        fundName: item.fundName,
                        howDidYouHearAboutUsDescription: item.howDidYouHearAboutUsDescription,
                        howDidYouHearAboutUsId: item.howDidYouHearAboutUsId,
                        securityPin: item.securityPin,
                        lineOfCredit: applicationDefaultSetting.regularLineOfCreditAmount,
                        contributionMinimumInitialAmount: applicationDefaultSetting.regularMinimumInitialContributionAmount,
                        contributionMinimumAdditionalAmount: applicationDefaultSetting.regularMinimumAdditionalContributionAmount,
                        grantMinimumAmount: applicationDefaultSetting.regularMinimumGrantAmount,
                        grantFeePercentage: applicationDefaultSetting.regularGrantFeePercentage,
                        certificateDeductionPercentage: applicationDefaultSetting.regularCertificateDeductionPercentage,
                        certificateFeePercentage: applicationDefaultSetting.regularCertificateFeePercentage,
                        extraBookletPercentage: applicationDefaultSetting.extraBookletPercentage,
                        notificationLimitRemainderAmount: applicationDefaultSetting.regularNotificationLimitRemainderAmount,
                        blankBookletMaxAmount: applicationDefaultSetting.blankBookletMaxAmount,
                        coreUser: {
                            userName: item.username,
                            firstName: item.firstName,
                            lastName: item.lastName,
                            json: item.json,
                            coreMembership: {
                                password: item.password,
                                confirmPassword: item.confirmPassword
                            }
                        },
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
                    await service.create(model);
                }
            },
            errorActions: {
                onCreateError: ({ type }) => {
                    switch (type) {
                        case ErrorType.Unique:
                            break;
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
            FormClass: DonorCreateForm,
        });

        this.service = service;
        this.prefixTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.prefixTypeStore.find();
                }
            });
        this.howDidYouHearAboutUsDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.howDidYouHearAboutUsStore.find();
                }
            });
    }

    @action.bound
    onBlurUsername(event) {
        this.usernameExists(event.target ? event.target.value : null)
    }

    @action.bound
    async usernameExists(username) {
        if (this.form.$('username').isValid) {
            try {
                const response = await this.rootStore.application.baasic.membershipModule.user.exists(username);
                if (response.statusCode === 204) {
                    this.form.$('username').invalidate('Username already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('username').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    onChangeLoginShow(visiblity) {
        this.loginShow = visiblity;
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
}

export default DonorCreateViewStore;
