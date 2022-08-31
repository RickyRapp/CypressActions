import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import { RouterState } from 'mobx-state-router';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable charity = null;
    @observable availableBalance = 0;
    @observable dataGrants = { item: [], type: "categoriesYearToDate"};

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
        this.getAccountBalance();
        this.getChartData();
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
        this.yearDropdownStore = new BaasicDropdownStore(null, {
            onChange: (value) => this.getChartData(value)
        }, 
            [
                { name: 'This Week', id: 7, code: "categoriesDays" }, 
                { name: 'This Month', id: 30, code: "categoriesWeeks" }, 
                { name: 'Last Month', id: -30, code: "categoriesWeeks" }, 
                { name: 'Year To Date', id: 2, code: "categoriesYearToDate" }, 
                { name: 'All time', id: 1, code: "categoriesYears" }
            ]
        ); 

        this.yearDropdownStore.setValue({ name: 'Year To Date', id: 2, code: "categoriesYearToDate" });
    }

    @action.bound
    async getChartData() {
        try {
            const response = await this.rootStore.application.charity.charityStore.getDashboardChartData({
                CharityId: this.rootStore.userStore.applicationUser.charityId, 
                Range: this.yearDropdownStore.value.id});
            
            this.dataGrants = {
                item: response.item.slice(0, 4),
                type: this.yearDropdownStore.value.code
            }

        } catch(err) {
            console.log(err);
        }
    }

    @action.bound
    async fetchCharityData() {
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
