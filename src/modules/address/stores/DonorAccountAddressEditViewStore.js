import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { AddressService } from "common/data";
import _ from 'lodash';

class DonorAccountAddressEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore) {
        super(rootStore);
        this.rootStore = rootStore;
        this.addressService = new AddressService(rootStore.app.baasic.apiClient);
        this.userId = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        this.getResource();
    }

    @action.bound
    async getResource() {
        let params = {};
        params.embed = 'address';
        params.orderBy = 'primary';
        params.orderDirection = 'desc';
        const response = await this.addressService.getDonorAccountCollection(this.userId, params);
        this.items = response;
    }

    @action.bound async onChangePrimaryAddress() {
        _.forEach(this.items, function (x) { x.primary = !x.primary });
        try {
            let response = await this.addressService.updateDonorAccountAddresses(this.items);
            await this.getResource();
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
        }
    }
}

export default DonorAccountAddressEditViewStore;