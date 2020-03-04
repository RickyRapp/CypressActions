import { action, observable, runInAction } from 'mobx';
import { CharityCreateForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { LookupService, CharityFileStreamService } from 'common/services';
import { applicationContext } from 'core/utils';
import _ from 'lodash';

const ErrorType = {
    Unique: 0
};

@applicationContext
class CharityCreateViewStore extends BaseEditViewStore {
    attachment = null;
    uploadTypes = null;
    @observable image = null;
    @observable uploadLoading = false;
    uploadTypes = ['.png', '.jpg', '.jpeg'];
    @observable loginShow = false;
    @observable bankAccountShow = false;
    charityAccountTypes = null;
    applicationDefaultSetting = null;

    constructor(rootStore) {
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity',
            id: undefined,
            actions: () => {
                return {
                    create: async (item) => {
                        await this.fetch([
                            this.usernameExists(item.coreUser.username),
                            this.taxIdExists(item.taxId)
                        ])
                        if (item.isOnlineAccountEnabled === true) {
                            if (!item.coreUser.username) {
                                this.form.$('coreUser.username').invalidate('The Username is required if you want create online account.')
                            }
                            if (!item.coreUser.coreMembership.password) {
                                this.form.$('coreUser.coreMembership.password').invalidate('The Password is required if you want create online account.')
                            }
                            if (!item.coreUser.coreMembership.confirmPassword) {
                                this.form.$('coreUser.coreMembership.confirmPassword').invalidate('The Confirm password is required if you want create online account.')
                            }
                        }
                        else {
                            item.coreUser = null;
                        }
                        if (item.bankAccount.name || item.bankAccount.accountNumber || item.bankAccount.routingNumber) {
                            if (!item.bankAccount.name) {
                                this.form.$('bankAccount.name').invalidate('The Name is required if you want create bank account.')
                            }
                            if (!item.bankAccount.accountNumber) {
                                this.form.$('bankAccount.accountNumber').invalidate('The Account number is required if you want create bank account.')
                            }
                            if (!item.bankAccount.routingNumber) {
                                this.form.$('bankAccount.routingNumber').invalidate('The routing number is required if you want create bank account.')
                            }
                        }
                        else {
                            item.bankAccount = null;
                        }
                        if (!this.form.isValid) {
                            throw { type: ErrorType.Unique };
                        }
                        if (item.isOnlineAccountEnabled) {
                            item.subscriptionNextDate =
                                new Date(Date.UTC(item.subscriptionNextDate.getFullYear(), item.subscriptionNextDate.getMonth(), item.subscriptionNextDate.getDate()));
                        }
                        try {
                            const response = await service.create(item);
                            await this.insertImage(response.data.response);
                        } catch (err) {
                            throw { error: err }
                        }
                    }
                }
            },
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.Unique:
                            break;
                        default:
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE', error);
                            break;
                    }
                }
            },
            FormClass: CharityCreateForm,
        });

        this.service = service;
        this.charityTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-type');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.charityStatusDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-status');
                const response = await service.getAll();
                return response.data;
            }
        });
        this.subscriptionTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                const service = new LookupService(this.rootStore.application.baasic.apiClient, 'subscription-type');
                const response = await service.getAll();
                return response.data;
            },
            onChange: () => {
                this.setSubscriptionAmount();
            }
        });

        this.charityAccountTypeDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: () => {
                    this.setSubscriptionAmount();
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goTo(
                'master.app.main.charity.list'
            )
        }
        else {
            await this.fetch([
                this.fetchAccountTypes(),
                this.fetchApplicationDefaultSetting(),
            ]);

            this.charityAccountTypeDropdownStore.setValue(_.find(this.charityAccountTypes, { abrv: 'regular' }))
            this.form.$('charityAccountTypeId').set(_.find(this.charityAccountTypes, { abrv: 'regular' }).id)
        }
    }

    @action.bound
    onChangeLoginShow(visiblity) {
        this.loginShow = visiblity;
    }

    @action.bound
    onChangeBankAccountShow(visiblity) {
        this.bankAccountShow = visiblity;
    }

    @action.bound
    onBlurUsername(event) {
        this.usernameExists(event.target ? event.target.value : null)
    }

    @action.bound
    onChangeIsOnlineAccountEnabled() {
        this.form.$('charityAccountTypeId').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('charityAccountTypeId').resetValidation();
        this.form.$('coreUser.username').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('coreUser.username').resetValidation();
        this.form.$('coreUser.coreMembership.password').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('coreUser.coreMembership.password').resetValidation();
        this.form.$('subscriptionTypeId').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('subscriptionTypeId').resetValidation();
        this.form.$('subscriptionAmount').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('subscriptionAmount').resetValidation();
        this.form.$('subscriptionNextDate').setRequired(this.form.$('isOnlineAccountEnabled').value);
        this.form.$('subscriptionNextDate').resetValidation();
    }

    @action.bound
    setSubscriptionAmount() {
        if (this.charityAccountTypeDropdownStore.value && this.subscriptionTypeDropdownStore.value) {
            if (this.charityAccountTypeDropdownStore.value.abrv === 'regular' && this.subscriptionTypeDropdownStore.value.abrv === 'monthly') {
                this.form.$('subscriptionAmount').set(this.applicationDefaultSetting.monthlyRegularSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'advanced' && this.subscriptionTypeDropdownStore.value.abrv === 'monthly') {
                this.form.$('subscriptionAmount').set(this.applicationDefaultSetting.monthlyAdvancedSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'regular' && this.subscriptionTypeDropdownStore.value.abrv === 'annual') {
                this.form.$('subscriptionAmount').set(this.applicationDefaultSetting.annualRegularSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'advanced' && this.subscriptionTypeDropdownStore.value.abrv === 'annual') {
                this.form.$('subscriptionAmount').set(this.applicationDefaultSetting.annualAdvancedSubscriptionAmount)
            }
        }
        else {
            this.form.$('subscriptionAmount').set('')
        }
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async fetchAccountTypes() {
        this.charityAccountTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'charity-account-type');
        const response = await service.getAll();
        this.charityAccountTypes = response.data;
        runInAction(() => {
            this.charityAccountTypeDropdownStore.setItems(this.charityAccountTypes);
            this.charityAccountTypeDropdownStore.setLoading(false);
        });
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
    async taxIdExists(taxId) {
        this.form.$('taxId').validate();
        if (this.form.$('taxId').isValid) {
            try {
                const response = await this.service.taxIdExists(taxId);
                if (response.statusCode === 204) {
                    this.form.$('taxId').invalidate('Tax Id already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.form.$('taxId').resetValidation();
                    return;
                }
            }
        }
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

    @action.bound async onAttachmentDrop(item) {
        this.attachment = item.affectedFiles[0].getRawFile();
        const binaryData = [];
        binaryData.push(this.attachment);
        this.image = window.URL.createObjectURL(new Blob(binaryData, { type: this.attachment.type }));
    }
}

export default CharityCreateViewStore;
