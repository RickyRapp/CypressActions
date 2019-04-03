import { action, runInAction, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountProfileEditForm } from 'modules/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountProfileEditViewStore extends BaseEditViewStore {
    @observable deliveryMethodTypeDropdownStore = null;
    @observable prefixTypeDropdownStore = null;

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;

        super(rootStore, {
            name: 'donor account',
            id: userId,
            actions: {
                update: async donorAccount => {
                    donorAccount.coreUser.json = JSON.stringify({ middleName: donorAccount.coreUser.middleName, prefixTypeId: donorAccount.coreUser.prefixTypeId });
                    await donorAccountService.update({
                        id: this.id,
                        ...donorAccount
                    });
                },
                get: async id => {
                    let params = {};
                    params.embed = ['coreUser,deliveryMethodType'];
                    const response = await donorAccountService.get(id, params);
                    if (isSome(response)) {
                        if (isSome(response.coreUser) && isSome(response.coreUser.json)) {
                            response.coreUser.middleName = (JSON.parse(response.coreUser.json)).middleName;
                            response.coreUser.prefixTypeId = (JSON.parse(response.coreUser.json)).prefixTypeId;
                        }
                    }
                    return response;
                }
            },
            FormClass: DonorAccountProfileEditForm
        });

        this.deliveryMethodTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'delivery-method-type');
        this.prefixTypeLookupService = new LookupService(rootStore.app.baasic.apiClient, 'prefix-type');
        this.userId = userId;
        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setStores();
    }

    @action.bound async loadLookups() {
        let deliveryMethodTypeModels = await this.deliveryMethodTypeLookupService.getAll();
        this.deliveryMethodType = deliveryMethodTypeModels.data;

        let prefixTypeModels = await this.prefixTypeLookupService.getAll();
        this.prefixType = prefixTypeModels.data;
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
    }

    @action.bound async onChangeDeliveryMethod(option) {
        if (option) {
            this.form.$('deliveryMethodTypeId').set('value', option.id);
        }
        else {
            this.form.$('deliveryMethodTypeId').clear();
        }
    }

    @action.bound async onChangePrefixType(option) {
        if (option) {
            this.form.$('coreUser.prefixTypeId').set('value', option.id)
        }
        else {
            this.form.$('coreUser.prefixTypeId').clear();
        }
    }
}

export default DonorAccountProfileEditViewStore;