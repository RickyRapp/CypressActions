import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { RouterState } from 'mobx-state-router';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable charity = null;
    @observable availableBalance = 0;

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
        this.getAccountBalance();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchCharityData()
            ]);
        }
    }

    createYearDropdownStore() {
        this.yearDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async fetchCharityData() {
        this.yearDropdownStore.setValue({ name: (new Date().getFullYear()).toString(), id: new Date().getFullYear() });
        this.yearDropdownStore.setValue({ name: 'Year To Date', id: 2 });
        this.charity = await this.rootStore.application.charity.charityStore.getCharity(this.rootStore.userStore.applicationUser.id);
    }

    @action.bound
    async redirectToWithdrawFundsPage(){
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.withdraw'));
    }

    @action.bound
    async redirectToManageAccount() {
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.profile'));
    }

    async getAccountBalance(){
        this.availableBalance = await this.rootStore.application.charity.charityStore.getCharityAvailableBalance(this.rootStore.userStore.applicationUser.id);
    }
}

export default DashboardViewStore;
