import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class PlaidSuccessfulVerificatonViewStore extends BaseViewStore {
    @observable bankAccountNumber;

    constructor(rootStore) {
        super(rootStore);
        this.getAccountNumber();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.suspend();
        }
    }

    @action.bound
    redirectToDashboard(){
        location.reload();
        this.rootStore.routerStore.goTo('master.app.main.charity.dashboard');
    }

    async getAccountNumber(){
        let params = {
            charityId: this.rootStore.userStore.applicationUser.id,
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.charity.charityStore.findCharityBank(params);
        this.bankAccountNumber = data.item[0] && data.item[0].accountNumber.slice(-4);
    }

    @action.bound
    redirectToSettings(){
        location.reload();
        this.rootStore.routerStore.goTo('master.app.main.charity.profile', null, {tab: '1'});
    }

}

export default PlaidSuccessfulVerificatonViewStore;
