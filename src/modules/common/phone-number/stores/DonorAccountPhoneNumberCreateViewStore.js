import { BaseEditViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import { PhoneNumberCreateForm } from "modules/common/phone-number/forms";
import _ from 'lodash';

class DonorAccountPhoneNumberCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate, userId }) {
        const phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        super(rootStore, {
            name: 'donor phone number',
            actions: {
                create: async donorAccountPhoneNumber => {
                    return await phoneNumberService.createDonorAccountPhoneNumber(userId, donorAccountPhoneNumber);
                }
            },
            FormClass: PhoneNumberCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountPhoneNumberCreateViewStore;