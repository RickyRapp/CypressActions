import { BaseEditViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import { DonorAccountPhoneNumberCreateForm } from "modules/phone-number/forms";
import _ from 'lodash';

class DonorAccountPhoneNumberCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate }) {
        const phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.userId ? rootStore.routerStore.routerState.params.userId : rootStore.authStore.user.id;

        super(rootStore, {
            name: 'donor phone number',
            actions: {
                create: async donorAccountPhoneNumber => {
                    try {
                        return await phoneNumberService.createDonorAccountCollection({ id: userId }, donorAccountPhoneNumber);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
                }
            },
            FormClass: DonorAccountPhoneNumberCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountPhoneNumberCreateViewStore;