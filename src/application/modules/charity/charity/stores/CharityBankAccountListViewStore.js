import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityBankAccountListViewStore extends BaseViewStore {
    addressService = null;
    @observable isEditEnabled = false;
    @observable editId = null;
    @observable bankAccounts = [];

       constructor(rootStore) {
        super(rootStore)
        this.charityId = rootStore.userStore.applicationUser.id;

        this.loadBankAccount();
    }

    async loadBankAccount() {
        let params = {
            charityId: this.charityId,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.charity.charityStore.findCharityBank(params);
        this.bankAccounts = data.item;
    }

    @action.bound
    onEnableEditClick(bankAccount) {
        this.editId = null;
        if (bankAccount) {
            this.editId = bankAccount.id;
        }
        else {
            this.editId = undefined;
        }
        this.isEditEnabled = true;
    }

    @action.bound
    onCancelEditClick() {
        this.editId = null;
        this.isEditEnabled = false;
    }

    @action.bound
    async onEditCompleted() {
        this.editId = null;
        this.isEditEnabled = false;
        await this.loadBankAccount();
    }
}

export default CharityBankAccountListViewStore;
