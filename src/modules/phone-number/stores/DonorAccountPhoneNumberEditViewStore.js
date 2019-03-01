import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { PhoneNumberService } from "common/data";
import _ from 'lodash';

class DonorAccountPhoneNumberEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore) {
        super(rootStore);
        this.phoneNumberService = new PhoneNumberService(rootStore.app.baasic.apiClient);
        this.fetch([this.getResource()]);
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        let params = {};
        params.sort = ['primary|desc']
        const response = await this.phoneNumberService.getDonorAccountCollection(id, params);
        this.items = response;
    }

    @action.bound async onChangePrimaryPhoneNumber() {
        this.items.map(donorAccountPhoneNumber => {
            if (donorAccountPhoneNumber.primary === true) {
                donorAccountPhoneNumber.primary = false;
            }
            else {
                donorAccountPhoneNumber.primary = true;
            }
        });
        await this.phoneNumberService.updateDonorAccountPhoneNumbers(this.items);
        await this.getResource();
        await setTimeout(() => this.notifySuccessUpdate("primary email address", { autoClose: 4000 }));
    }

    @action.bound
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success(
            `Successfully updated ${_.toLower(name)}.`
        );
    }
}

export default DonorAccountPhoneNumberEditViewStore;