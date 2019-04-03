import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import { PhoneNumberEditForm } from "modules/phone-number/forms";
import _ from 'lodash';

class PhoneNumberEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterUpdate, item }) {
        const phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'phone number',
            id: id,
            actions: {
                update: async phoneNumber => {
                    try {
                        return await phoneNumberService.update(phoneNumber);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                },
                get: async id => {
                    if (item) {
                        return item;
                    }
                    else {
                        let params = {};
                        const response = await phoneNumberService.get(id, params);
                        return response;
                    }
                }
            },
            FormClass: PhoneNumberEditForm,
            goBack: false,
            onAfterUpdate: onAfterUpdate
        });
    }
}

export default PhoneNumberEditViewStore;