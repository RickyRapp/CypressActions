import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class CharityWithdrawFundsViewStore extends BaseViewStore {
    @observable accountBanalce = 0;
    @observable isACH = true;
    @observable charityAddress;
    @observable bankAccount;

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
    async createWithdraw(){
        console.log(this.isACH);
        console.log(this.bankAccount);
        console.log(this.charityAddress);
    }

}

export default CharityWithdrawFundsViewStore;
