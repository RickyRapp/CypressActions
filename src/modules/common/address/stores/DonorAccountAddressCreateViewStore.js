import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { AddressCreateForm } from "modules/common/address/forms";
import _ from 'lodash';

class DonorAccountAddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate, userId }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor address',
            actions: {
                create: async donorAccountAddress => {
                    return await addressService.createDonorAccountAddress(userId, donorAccountAddress);
                }
            },
            FormClass: AddressCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountAddressCreateViewStore;