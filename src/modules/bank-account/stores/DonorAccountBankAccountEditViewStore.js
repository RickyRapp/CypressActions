import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { BankAccountService } from "common/data";
import _ from 'lodash';

class DonorAccountBankAccountEditViewStore extends BaseViewStore {
    @observable items = null;
    @observable hide = true;

    constructor(rootStore) {
        super(rootStore);
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        this.fetch([this.getResource()]);
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        let params = {};
        params.sort = ['dateCreated|asc']
        const response = await this.bankAccountService.getDonorAccountCollection(id, params);
        this.items = response;
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

export default DonorAccountBankAccountEditViewStore;