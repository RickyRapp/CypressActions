import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { EmailAddressService } from "common/data";
import _ from 'lodash';

class DonorAccountEmailAddressEditViewStore extends BaseViewStore {
    @observable items = null;
    @observable hide = true;

    constructor(rootStore) {
        super(rootStore);
        this.emailAddressService = new EmailAddressService(rootStore.app.baasic.apiClient);
        this.fetch([this.getResource()]);
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        let params = {};
        params.sort = ['primary|desc']
        const response = await this.emailAddressService.getDonorAccountCollection(id, params);
        this.items = response;
    }

    @action.bound async onChangePrimaryEmailAddress() {
        this.items.map(donorAccountEmailAddress => {
            if (donorAccountEmailAddress.primary === true) {
                donorAccountEmailAddress.primary = false;
            }
            else {
                donorAccountEmailAddress.primary = true;
            }
        });
        await this.emailAddressService.updateDonorAccountEmailAddresses(this.items);
        await this.getResource();
        await setTimeout(() => this.notifySuccessUpdate("primary email address", { autoClose: 4000 }));
    }

    @action.bound
    notifySuccessUpdate(name) {
        this.rootStore.notificationStore.success(
            `Successfully updated ${_.toLower(name)}.`
        );
    }


    @action.bound
    async onShowHideChange() {
        if (event.target.checked) {
            this.hide = true;
        }
        else {
            this.hide = false;
        }
    }
}

export default DonorAccountEmailAddressEditViewStore;