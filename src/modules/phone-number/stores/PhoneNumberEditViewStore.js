import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import { PhoneNumberEditForm } from "modules/phone-number/forms";
import _ from 'lodash';

class PhoneNumberEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterCreate }) {
        const phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;
        super(rootStore, {
            name: 'phone number',
            id: id,
            actions: {
                update: async phoneNumber => {
                    await phoneNumberService.update(phoneNumber);
                },
                create: async phoneNumber => {
                    await phoneNumberService.createDonorAccountCollection({ id: userId }, phoneNumber);
                },
                get: async id => {
                    let params = {};
                    const response = await phoneNumberService.get(id, params);
                    return response;
                }
            },
            FormClass: PhoneNumberEditForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default PhoneNumberEditViewStore;