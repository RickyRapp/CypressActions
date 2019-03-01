import { action, observable } from 'mobx';
import { BaseViewStore, BaasicDropdownStore } from "core/stores";
import { AddressService } from "common/data";
import { DonorAccountProfileEditForm } from 'modules/donor-account/forms';
import { isSome } from 'core/utils';
import _ from 'lodash';

class DonorAccountAddressEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore) {
        super(rootStore);
        this.addressService = new AddressService(rootStore.app.baasic.apiClient);
        this.fetch([this.getResource()]);
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        let params = {};
        params.sort = ['primary|desc']
        const response = await this.addressService.getDonorAccountCollection(id, params);
        this.items = response;
    }

    @action.bound async onChangePrimaryAddress() {
        this.items.map(donorAccountAddress => {
            if (donorAccountAddress.primary === true) {
                donorAccountAddress.primary = false;
            }
            else {
                donorAccountAddress.primary = true;
            }
        });
        await this.addressService.updateDonorAccountAddresses(this.items);
        await this.getResource();
        await setTimeout(() => this.notifySuccessUpdate("primary address", { autoClose: 4000 }));
    }

    @action.bound
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success(
            `Successfully updated ${_.toLower(name)}.`
        );
    }
}

export default DonorAccountAddressEditViewStore;