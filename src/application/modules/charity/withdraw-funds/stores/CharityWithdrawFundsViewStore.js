import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { RouterState } from 'mobx-state-router';

@applicationContext
class CharityWithdrawFundsViewStore extends BaseViewStore {
    @observable accountBanalce = 0;
    @observable isACH = true;
    @observable charityAddress;
    @observable bankAccount;
    @observable amount;
    @observable amountValidationMessage;
    @observable addressValidationMessage;
    @observable bankAccountValidationMessage;

    constructor(rootStore) {
        super(rootStore);

        this.getAccountBalance();
        this.getCharityAddress();
        this.createBankAccountDropdownStore();
    }

    async getAccountBalance(){
        this.accountBanalce = await this.rootStore.application.charity.charityStore.getCharityAccountBalance(this.rootStore.userStore.applicationUser.id);
    }

    @action.bound
    onChange(value){
        this.isACH = value;
    }

    async getCharityAddress(){
        let params = {
            charityId: this.rootStore.userStore.applicationUser.id,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.charity.charityStore.findCharityAddress(params);
        this.charityAddress = data.item[0];
    }

    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const data = await this.rootStore.application.administration.charityStore.getCharity(this.rootStore.userStore.applicationUser.id, { embed: 'charityBankAccounts' });
                    var plaidVerifiedBankAccounts = data.charityBankAccounts.filter(c => {
                        return (
                            c.isVerifiedByPlaid === true
                        )
                    });
                    return plaidVerifiedBankAccounts;
                },
                onChange: (bankAccount) => {
                    this.bankAccount = bankAccount;
                }
            });
    }

    @action.bound
    changeValue(value){
        if(value <=0){
            this.amountValidationMessage = "Amount can't be lower than 0."
            return false;
        }

        if( this.accountBanalce < value ){
            this.amountValidationMessage = "Amount can't be greater than account balance."
            return false;
        }

        this.amountValidationMessage = '';
        this.amount = value;
    }

    @action.bound
    async createWithdraw(){
        var address = this.charityAddress;
        this.bankAccountValidationMessage = "";
        this.amountValidationMessage = "";
        this.addressValidationMessage = "";

        if(!this.isACH && ( address.addressLine1 === ""
            || address.city === ""
            || address.state === ""
            || address.zipCode === "")){
            this.addressValidationMessage = "Invalid address."
            return false
        } 
        if(this.isACH && (this.bankAccount === null || this.bankAccount === undefined || this.bankAccount === "" ) ){
            this.bankAccountValidationMessage = "Please select bank account."
            return false;
        }

        if(!this.amount || this.amount <=0 || this.accountBanalce <= this.amount){
            this.amountValidationMessage = 'Please enter valid Amount.';
            return false;
        }

        var resource = {
            charityId: this.rootStore.userStore.applicationUser.id,
            amount: this.amount,
            charityBankAccountId: this.bankAccount,
            IsAch: this.isACH,
            charityAddress : {
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
            }
        }

       const data = await this.rootStore.application.charity.grantStore.createWithdraw(resource);
       this.rootStore.notificationStore.success('Successfully created withdraw');
       this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.dashboard')); 
    }

}

export default CharityWithdrawFundsViewStore;
