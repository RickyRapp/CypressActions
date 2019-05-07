import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { AddressCreateForm } from "modules/common/address/forms";
import _ from 'lodash';

class AddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { route, userId, onAfterCreate }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'address',
            actions: {
                create: async address => {
                    return await addressService.createAddress(route, userId, address);
                }
            },
            FormClass: AddressCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default AddressCreateViewStore;