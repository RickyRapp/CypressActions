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
        params.embed = 'phoneNumber';
        params.orderBy = 'primary';
        params.orderDirection = 'desc';
        const response = await this.phoneNumberService.getDonorAccountCollection(this.userId, params);
        this.items = response;
    }

    @action.bound async onChangePrimaryPhoneNumber() {
        _.forEach(this.items, function (x) { x.primary = !x.primary });
        try {
            let response = await this.phoneNumberService.updateDonorAccountPhoneNumbers(this.items);
            this.getResource();
            this.rootStore.notificationStore.showMessageFromResponse(response, 6000);
        } catch (errorResponse) {
            this.rootStore.notificationStore.showMessageFromResponse(errorResponse, 6000);
        }
    }
}

export default DonorAccountPhoneNumberEditViewStore;