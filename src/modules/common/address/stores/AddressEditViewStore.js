import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { AddressEditForm } from "modules/common/address/forms";
import _ from 'lodash';

class AddressEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterUpdate, item }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'address',
            id: id,
            actions: {
                update: async address => {
                    return await addressService.update(address);
                },
                get: async id => {
                    if (item) {
                        return item;
                    }
                    else {
                        let params = {};
                        const response = await addressService.get(id, params);
                        return response;
                    }
                }
            },
            FormClass: AddressEditForm,
            goBack: false,
            onAfterUpdate: onAfterUpdate
        });
    }
}

export default AddressEditViewStore;