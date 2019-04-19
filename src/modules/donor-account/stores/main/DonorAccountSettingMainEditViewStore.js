import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountSettingAdministrationEditForm } from 'modules/donor-account/forms';
import _ from 'lodash';

class DonorAccountSettingMainEditViewStore extends BaseEditViewStore {
    @observable deliveryMethodTypeDropdownStore = null;

    constructor(rootStore, fetchedDonorAccunt) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.authStore.user.id,
            actions: {
                update: async donorAccount => {
                    donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });
                    return await donorAccountService.updateSettings({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    if (fetchedDonorAccunt) {
                        return fetchedDonorAccunt;
                    }
                    const response = await donorAccountService.getSettings(id);
                    return response;
                },
            },
            FormClass: DonorAccountSettingAdministrationEditForm,
            goBack: false
        });

        this.form.setFieldsDisabled(true);
        this.form.$('deliveryMethodTypeId').set('disabled', false);
        this.form.$('blankBookletMax').set('disabled', false);
        this.form.$('notificationLimitRemainderAmount').set('disabled', false);
        this.form.$('securityPin').set('disabled', false);

        this.form.each(field => field.resetValidation());

        this.deliveryMethodTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'delivery-method-type');
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        let deliveryMethodTypeModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodType = deliveryMethodTypeModels.data;
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
    }

    @action.bound async onChangeDeliveryMethod(option) {
        this.form.$('deliveryMethodTypeId').set('value', option ? option.id : null);
    }
}

export default DonorAccountSettingMainEditViewStore;