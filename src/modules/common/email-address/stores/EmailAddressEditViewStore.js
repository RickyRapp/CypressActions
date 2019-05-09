import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import { EmailAddressEditForm } from "modules/common/email-address/forms";
import _ from 'lodash';

class EmailAddressEditViewStore extends BaseEditViewStore {
    constructor(rootStore, { id, onAfterUpdate, item }) {
        const emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'email address',
            id: id,
            actions: {
                update: async emailAddress => {
                    return await emailAddressService.update(emailAddress);
                },
                get: async id => {
                    if (item) {
                        return item;
                    }
                    else {
                        let params = {};
                        const response = await emailAddressService.get(id, params);
                        return response;
                    }
                }
            },
            FormClass: EmailAddressEditForm,
            goBack: false,
            onAfterUpdate: onAfterUpdate
        });
    }
}

export default EmailAddressEditViewStore;