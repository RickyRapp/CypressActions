import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorBankAccountViewStore extends BaseViewStore {
    addressService = null;
    @observable isEditEnabled = false;
    @observable editId = null;
    @observable bankAccounts = [];

    constructor(rootStore) {
        super(rootStore)
        this.donorId = rootStore.userStore.applicationUser.id;

        this.loadBankAccount();
    }

    async loadBankAccount() {
        let params = {
            donorId: this.donorId,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.donor.donorStore.findBankAccount(params);
        this.bankAccounts = data.item;

        let bankAcc = this.bankAccounts.find(b => b.isPrimary === true);
        if(!this.editId && bankAcc){
            this.editId = bankAcc.id;
            this.onEnableEditClick(bankAcc);
        }
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

export default DonorBankAccountViewStore;
