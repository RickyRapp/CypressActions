import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { DonorAccountAddressCreateForm } from "modules/common/address/forms";
import _ from 'lodash';

class DonorAccountAddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate, userId }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor address',
            actions: {
                create: async donorAccountAddress => {
                    await addressService.createDonorAccountCollection({ id: userId }, donorAccountAddress);
                }
            },
            FormClass: DonorAccountAddressCreateForm,
            goBack: false,
            onAfterCreate: onAfterCreate
        });
    }
}

export default DonorAccountAddressCreateViewStore;