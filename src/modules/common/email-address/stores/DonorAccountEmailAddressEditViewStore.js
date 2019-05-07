import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import _ from 'lodash';

class DonorAccountEmailAddressEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore, { userId }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let params = {};
        params.embed = 'donorAccountEmailAddresses'
        params.donorAccountId = this.userId;
        const response = await this.emailAddressService.find(params);
        this.items = response.item;
    }

    @action.bound async onMarkPrimaryEmailAddress(emailAddressId) {
        try {
            const response = await this.emailAddressService.markPrimary('donor-account/mark-primary', this.userId, emailAddressId);
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
            await this.getResource(this.id, false);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
            return;
        }
    }
}

export default DonorAccountEmailAddressEditViewStore;