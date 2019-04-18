import { BaseEditViewStore } from "core/stores";
import { AddressService } from "common/data";
import { DonorAccountAddressCreateForm } from "modules/address/forms";
import _ from 'lodash';

class DonorAccountAddressCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, { onAfterCreate }) {
        const addressService = new AddressService(rootStore.app.baasic.apiClient);
        let userId = rootStore.routerStore.routerState.params.userId ? rootStore.routerStore.routerState.params.userId : rootStore.authStore.user.id;

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