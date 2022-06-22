import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class CharityWithdrawFundsViewStore extends BaseViewStore {
    @observable accountBanalce = 0;
    @observable isACH = true;
    @observable charityAddress;

    constructor(rootStore) {
        super(rootStore);

        this.getAccountBalance();
        this.getCharityAddress();
        this.addressLine1;
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
}

export default CharityWithdrawFundsViewStore;
