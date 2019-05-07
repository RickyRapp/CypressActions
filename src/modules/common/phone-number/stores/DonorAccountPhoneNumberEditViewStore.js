import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import _ from 'lodash';

class DonorAccountPhoneNumberEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore, { userId }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let params = {};
        params.embed = 'donorAccountPhoneNumbers'
        params.donorAccountId = this.userId;
        const response = await this.phoneNumberService.find(params);
        this.items = response.item;
    }

    @action.bound async onMarkPrimaryPhoneNumber(phoneNumberId) {
        try {
            const response = await this.phoneNumberService.markPrimary('donor-account/mark-primary', this.userId, phoneNumberId);
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
            await this.getResource(this.id, false);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
            return;
        }
    }
}

export default DonorAccountPhoneNumberEditViewStore;