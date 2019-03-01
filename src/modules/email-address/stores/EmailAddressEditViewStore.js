import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import { EmailAddressEditForm } from "modules/email-address/forms";
import _ from 'lodash';

class EmailAddressEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterCreate }) {
        const emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;
        super(rootStore, {
            name: 'email address',
            id: id,
            actions: {
                update: async emailAddress => {
                    await emailAddressService.update(emailAddress);
                },
                create: async emailAddress => {
                    await emailAddressService.createDonorAccountCollection({ id: userId }, emailAddress);
                },
                get: async id => {
                    let params = {};
                    const response = await emailAddressService.get(id, params);
                    return response;
                }
            },
            FormClass: EmailAddressEditForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default EmailAddressEditViewStore;