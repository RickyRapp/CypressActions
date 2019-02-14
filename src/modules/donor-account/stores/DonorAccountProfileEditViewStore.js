import { action } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountProfileEditForm } from 'modules/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountProfileEditViewStore extends BaseEditViewStore {

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id,
            actions: {
                update: async donorAccount => {
                    if (isSome(donorAccount.coreUser.prefixType)) {
                        donorAccount.coreUser.prefixTypeId = donorAccount.coreUser.prefixType.id;
                    }

                    donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });

                    if (isSome(donorAccount.deliveryMethodType)) {
                        donorAccount.deliveryMethodTypeId = donorAccount.deliveryMethodType.id;
                    }

                    await donorAccountService.update({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    let params = {};
                    params.embed = ['coreUser,deliveryMethodType'];
                    const response = await donorAccountService.get(id, params);
                    if (isSome(response) && isSome(response.coreUser) && isSome(response.coreUser.json)) {
                        response.coreUser.middleName = (JSON.parse(response.coreUser.json)).middleName;
                        response.coreUser.prefixTypeId = (JSON.parse(response.coreUser.json)).prefixTypeId;
                        if (isSome(response.coreUser.prefixTypeId)) {
                            let lookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'prefix-type')
                            let models = await lookupService.getAll();
                            response.coreUser.prefixType = _.find(models.data, { id: response.coreUser.prefixTypeId });
                        }
                    }
                    return response;
                },
            },
            FormClass: DonorAccountProfileEditForm
        });


        this.deliveryMethodTypeMultiSelectStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: false,
                placeholder: 'Choose Delivery Method'
            },
            {
                fetchFunc: term => {
                    return this.handleOptions('delivery-method-type');
                },
                onChange: this.onChangeDeliveryMethod
            }
        );

        this.prefixTypeMultiSelectStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Prefix Type'
            },
            {
                fetchFunc: term => {
                    return this.handleOptions('prefix-type');
                },
                onChange: this.onChangePrefixType
            },
        );
    }

    @action.bound async onChangeDeliveryMethod(option) {
        this.item.deliveryMethodType = option;
        this.form.update(this.item);
    }

    @action.bound async onChangePrefixType(option) {
        this.item.coreUser.prefixType = option;
        this.form.update(this.item);
    }

    @action.bound async handleOptions(lookupType) {
        let lookupService = new LookupService(this.rootStore.app.baasic.apiClient, lookupType)
        let models = await lookupService.getAll();
        return models.data;
    }
}

export default DonorAccountProfileEditViewStore;