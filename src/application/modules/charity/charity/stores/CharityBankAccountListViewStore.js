import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityBankAccountListViewStore extends BaseViewStore {
    addressService = null;
    @observable isEditEnabled = false;
    @observable editId = null;
    @observable bankAccounts = [];
    @observable charity = null;

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
        this.charity = await this.rootStore.application.charity.charityStore.getCharity(this.charityId, { embed: 'charityBankAccounts' });

        let bankAcc = this.bankAccounts.find(b => b.isPrimary === true);
        if(!this.editId && bankAcc){
            this.editId = bankAcc.id;
            this.onEnableEditClick(bankAcc);
        }
    }

    @action.bound
    onEnableEditClick(bankAccount) {
        this.onCancelEditClick();
        
        if (bankAccount) {
            this.editId = bankAccount.id;
            this.isEditEnabled = true;
        }
        else {
            this.editId = undefined;
        }
       
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
