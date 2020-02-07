import { CharityEditForm, CharityOnlineAccountForm } from 'application/charity/forms';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityService } from 'application/charity/services';
import { LookupService } from 'common/services';
import { action, runInAction } from 'mobx';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityEditViewStore extends BaseEditViewStore {
    applicationDefaultSetting = null;
    charityAccountTypes = null;

    formOnlineAccount = new CharityOnlineAccountForm({
        onSuccess: async form => {
            const account = form.values();
            await this.usernameExists(account.coreUser.username);

            if (!this.formOnlineAccount.isValid) {
                return this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
            }
            await this.createOnlineAccountAsync(account);
        }
    });

    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const service = new CharityService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'charity',
            id: id,
            actions: () => {
                return {
                    get: async (id) => {
                        const params = {
                            embed: [
                                'contactInformation',
                                'coreUser'
                            ]
                        }
                        const response = await service.get(id, params);
                        return response.data;
                    },
                    update: async (resource) => {
                        await service.update(
                            {
                                id: id,
                                ...resource
                            });
                        this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                    }
                }
            },
            FormClass: CharityEditForm,
            onAfterAction: () => {
                this.getResource(this.charityId);
                this.setDisabledFields();
            }
        });

        this.service = service;
        this.charityId = id;
        this.formOnlineAccount.$('activationUrl').set(window.location.hostname + '/account-activation');

        this.charityTypeDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(rootStore.application.baasic.apiClient, 'charity-type');
                    const response = await service.getAll();
                    return response.data;
                }
            });

        this.charityStatusDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const service = new LookupService(rootStore.application.baasic.apiClient, 'charity-status');
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
                this.getResource(this.charityId)
            ]);

            this.charityAccountTypeDropdownStore.setValue(_.find(this.charityAccountTypes, { abrv: 'regular' }));
            this.formOnlineAccount.$('charityAccountTypeId').set(_.find(this.charityAccountTypes, { abrv: 'regular' }).id);

            this.setDisabledFields();
        }
    }

    @action.bound
    setDisabledFields() {
        if (!this.hasPermission('theDonorsFundAdministrationSection.update')) {
            this.form.$('name').setDisabled(true);
            this.form.$('dba').setDisabled(true);
            this.form.$('charityStatusId').setDisabled(true);
            this.form.$('charityTypeId').setDisabled(true);

            this.form.$('name').resetValidation();
            this.form.$('dba').resetValidation();
            this.form.$('charityStatusId').resetValidation();
            this.form.$('charityTypeId').resetValidation();
        }
    }

    @action.bound
    setSubscriptionAmount() {
        if (this.charityAccountTypeDropdownStore.value && this.subscriptionTypeDropdownStore.value) {
            if (this.charityAccountTypeDropdownStore.value.abrv === 'regular' && this.subscriptionTypeDropdownStore.value.abrv === 'monthly') {
                this.formOnlineAccount.$('subscriptionAmount').set(this.applicationDefaultSetting.monthlyRegularSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'advanced' && this.subscriptionTypeDropdownStore.value.abrv === 'monthly') {
                this.formOnlineAccount.$('subscriptionAmount').set(this.applicationDefaultSetting.monthlyAdvancedSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'regular' && this.subscriptionTypeDropdownStore.value.abrv === 'annual') {
                this.formOnlineAccount.$('subscriptionAmount').set(this.applicationDefaultSetting.annualRegularSubscriptionAmount)
            }
            else if (this.charityAccountTypeDropdownStore.value.abrv === 'advanced' && this.subscriptionTypeDropdownStore.value.abrv === 'annual') {
                this.formOnlineAccount.$('subscriptionAmount').set(this.applicationDefaultSetting.annualAdvancedSubscriptionAmount)
            }
        }
        else {
            this.formOnlineAccount.$('subscriptionAmount').set('')
        }
    }

    @action.bound
    onBlurUsername(event) {
        this.usernameExists(event.target ? event.target.value : null)
    }

    @action.bound
    async usernameExists(username) {
        if (this.formOnlineAccount.$('coreUser.username').isValid) {
            try {
                const response = await this.rootStore.application.baasic.membershipModule.user.exists(username);
                if (response.statusCode === 204) {
                    this.formOnlineAccount.$('coreUser.username').invalidate('Username already exists.')
                    return;
                }
            } catch (err) {
                if (err.statusCode === 404) {
                    this.formOnlineAccount.$('coreUser.username').resetValidation();
                    return;
                }
            }
        }
    }

    @action.bound
    async createOnlineAccountAsync(account) {
        try {
            await this.service.createOnlineAccount({
                id: this.charityId,
                ...account
            });

            this.rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
            await this.getResource(this.charityId);
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
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

}

export default CharityEditViewStore;
