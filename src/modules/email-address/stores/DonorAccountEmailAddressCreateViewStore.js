import { BaseEditViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import { DonorAccountEmailAddressCreateForm } from "modules/email-address/forms";

class DonorAccountEmailAddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate }) {
        const emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;

        super(rootStore, {
            name: 'donor email address',
            actions: {
                create: async donorAccountEmailAddress => {
                    try {
                        return await emailAddressService.createDonorAccountCollection({ id: userId }, donorAccountEmailAddress);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                }
            },
            FormClass: DonorAccountEmailAddressCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountEmailAddressCreateViewStore;