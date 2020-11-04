import { action, observable } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore, BaasicUploadStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { CharityFileStreamService } from 'common/services';
import { applicationContext } from 'core/utils';
import { localizationService, validatorService } from 'core/services';

@applicationContext
class CharityCreateViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        const model = {
                            activationUrl: `${window.location.origin}/app/account-activation/?activationToken={activationToken}`,
                            name: resource.name,
                            taxId: resource.taxId,
                            dba: resource.dba,
                            charityTypeId: resource.charityTypeId,
                            charityStatusId: resource.charityStatusId,
                            suggestedById: null,
                            address: {
                                addressLine1: resource.addressAddressLine1,
                                addressLine2: resource.addressAddressLine2,
                                city: resource.addressCity,
                                state: resource.addressState,
                                zipCode: resource.addressZipCode,
                                decription: resource.addressDescription
                            },
                            contactInformation: {
                                name: resource.contactInformationName,
                                email: resource.contactInformationEmail,
                                number: resource.contactInformationNumber
                            }
                        }

                        if (resource.isNewBankAccount) {
                            model.bankAccount = {
                                name: resource.bankAccountName,
                                accountNumber: resource.bankAccountAccountNumber,
                                routingNumber: resource.bankAccountRoutingNumber,
                                description: resource.bankAccountDescription,
                                accountHolder: {
                                    addressLine1: resource.bankAccountAccountHolderAddressLine1,
                                    addressLine2: resource.bankAccountAccountHolderAddressLine2,
                                    city: resource.bankAccountAccountHolderCity,
                                    state: resource.bankAccountAccountHolderState,
                                    zipCode: resource.bankAccountAccountHolderZipCode,
                                    email: resource.bankAccountAccountHolderEmail,
                                    number: resource.bankAccountAccountHolderNumber
                                },
                            }
                        }

                        if (resource.isNewOnlineAccount) {
                            model.coreUser = {
                                userName: resource.username,
                                coreMembership: {
                                    password: resource.password,
                                    confirmPassword: resource.confirmPassword
                                }
                            }
                        }

                        const data = await this.rootStore.application.charity.charityStore.createCharity(model);
                        if (resource.isNewBankAccount && this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                            await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], data.response.charityId, data.response.bankAccountId);
                        }
                    }
                }
            },
            FormClass: CharityCreateForm,
            errorActions: {
                onCreateError: () => {
                    this.setBankAccountFieldsDisabled(this.form.$('isNewBankAccount').value);
                    this.setOnlineAccountFieldsDisabled(this.form.$('isNewOnlineAccount').value);
                }
            },
        });

        this.createCharityTypeDropdownStore();
        this.createCharityStatusDropdownStore();
        this.createUniqueConstraintValidators();
        this.createImageUploadStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadLookups()
            ]);

            this.form.$('isNewBankAccount').observe(({ field }) => {
                this.onNewBankAccountChange(field.value)
            });
            this.form.$('isNewOnlineAccount').observe(({ field }) => {
                this.onNewOnlineAccountChange(field.value)
            });
        }
    }

    @action.bound
    onNewBankAccountChange(value) {
        this.setBankAccountFieldsDisabled(value);
    }

    setBankAccountFieldsDisabled(value) {
        this.form.$('bankAccountName').setDisabled(!value);
        this.form.$('bankAccountAccountNumber').setDisabled(!value);
        this.form.$('bankAccountRoutingNumber').setDisabled(!value);
        this.form.$('bankAccountDescription').setDisabled(!value);
        this.form.$('bankAccountAccountHolderAddressLine1').setDisabled(!value);
        this.form.$('bankAccountAccountHolderAddressLine2').setDisabled(!value);
        this.form.$('bankAccountAccountHolderCity').setDisabled(!value);
        this.form.$('bankAccountAccountHolderState').setDisabled(!value);
        this.form.$('bankAccountAccountHolderZipCode').setDisabled(!value);
        this.form.$('bankAccountAccountHolderEmail').setDisabled(!value);
        this.form.$('bankAccountAccountHolderNumber').setDisabled(!value);
        this.form.$('coreMediaVaultEntryId').setDisabled(!value);
    }

    @action.bound
    onNewOnlineAccountChange(value) {
        this.setOnlineAccountFieldsDisabled(value);
    }

    setOnlineAccountFieldsDisabled(value) {
        this.form.$('username').setDisabled(!value);
        this.form.$('password').setDisabled(!value);
        this.form.$('confirmPassword').setDisabled(!value);
    }

    async loadLookups() {
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
    }

    @action.bound
    async insertImage(charityId) {
        if (this.attachment != null) {
            try {
                var service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.uploadLoading = true;
                const response = await service.uploadCharityBankAccount(this.attachment, charityId);
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

    createUniqueConstraintValidators() {
        validatorService.registerAsyncValidator('usernameUnique', async (value, attribute, req, passes) => {
            try {
                const { statusCode } = await this.rootStore.application.baasic.membershipModule.user.exists(value);
                if (statusCode === 204) {
                    return passes(false, localizationService.t('CHARITY.CREATE.ERROR_MESSAGES.USERNAME_CONFLICT'))
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    return passes();
                }
                return passes(false, localizationService.t('CHARITY.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });

        validatorService.registerAsyncValidator('taxIdUnique', async (value, attribute, req, passes) => {
            try {
                const statusCode = await this.rootStore.application.charity.charityStore.taxIdExists(value);
                debugger
                if (statusCode === 204) {
                    return passes(false, localizationService.t('CHARITY.CREATE.ERROR_MESSAGES.TAX_ID_CONFLICT'))
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    return passes();
                }
                return passes(false, localizationService.t('CHARITY.CREATE.ERROR_MESSAGES.GENERAL_ERROR'))
            }
        });
    }

    createCharityStatusDropdownStore() {
        this.charityStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.charityStatusStore.find();
            }
        });
    }

    createCharityTypeDropdownStore() {
        this.charityTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.charityTypeStore.find();
            }
        });
    }

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore();
    }
}

export default CharityCreateViewStore;
