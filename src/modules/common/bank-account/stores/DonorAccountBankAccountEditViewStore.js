import { action, observable } from 'mobx';
import { BaseViewStore } from "core/stores";
import { BankAccountService } from "common/data";
import _ from 'lodash';

class DonorAccountBankAccountEditViewStore extends BaseViewStore {
    @observable items = null;

    constructor(rootStore, { userId }) {
        super(rootStore);
        this.bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);
        this.userId = userId;
        this.getResource();
    }

    @action.bound
    async getResource() {
        let params = {};
        params.embed = ['bankAccount,accountHolder,address,emailAddress,phoneNumber']
        params.orderBy = 'dateCreated';
        params.orderDirection = 'asc';
        const response = await this.bankAccountService.getDonorAccountCollection(this.userId, params);
        this.items = response;
    }
}

export default DonorAccountBankAccountEditViewStore;