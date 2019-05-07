import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { AddressService } from "common/data";
import _ from 'lodash';

class DonorAccountAddressEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore, { userId }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.addressService = new AddressService(rootStore.app.baasic.apiClient);
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let params = {};
        params.embed = 'donorAccountAddresses'
        params.donorAccountId = this.userId;
        const response = await this.addressService.find(params);
        this.items = response.item;
    }

    @action.bound async onMarkPrimaryAddress(addressId) {
        try {
            const response = await this.addressService.markPrimary('donor-account/mark-primary', this.userId, addressId);
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
            await this.getResource(this.id, false);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
            return;
        }
    }
}

export default DonorAccountAddressEditViewStore;