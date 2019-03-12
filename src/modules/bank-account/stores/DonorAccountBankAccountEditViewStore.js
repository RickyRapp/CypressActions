import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { BankAccountService } from "common/data";
import _ from 'lodash';

class DonorAccountBankAccountEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore) {
        super(rootStore);
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        this.fetch([this.getResource()]);
    }

    @action.bound
    async getResource() {
        let id = this.rootStore.routerStore.routerState.params.id ? this.rootStore.routerStore.routerState.params.id : this.rootStore.authStore.user.id
        let params = {};
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        const response = await this.bankAccountService.getDonorAccountCollection(id, params);
        this.items = response;
    }
}

export default DonorAccountBankAccountEditViewStore;