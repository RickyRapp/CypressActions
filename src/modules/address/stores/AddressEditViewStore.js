import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { AddressEditForm } from "modules/address/forms";
import _ from 'lodash';

class AddressEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterCreate }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;
        super(rootStore, {
            name: 'address',
            id: id,
            actions: {
                update: async address => {
                    await addressService.update(address);
                },
                create: async address => {
                    await addressService.createDonorAccountCollection({ id: userId }, address);
                },
                get: async id => {
                    let params = {};
                    const response = await addressService.get(id, params);
                    return response;
                }
            },
            FormClass: AddressEditForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default AddressEditViewStore;