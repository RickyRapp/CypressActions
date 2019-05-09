import { BaseEditViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import { EmailAddressCreateForm } from "modules/common/email-address/forms";

class DonorAccountEmailAddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate, userId }) {
        const emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor email address',
            actions: {
                create: async donorAccountEmailAddress => {
                    return await emailAddressService.createDonorAccountEmailAddress(userId, donorAccountEmailAddress);
                }
            },
            FormClass: EmailAddressCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountEmailAddressCreateViewStore;