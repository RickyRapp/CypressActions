import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable, computed } from 'mobx';
import { RouterState } from 'mobx-state-router';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable charity = null;
    @observable dataGrants = { item: [], type: "categoriesYearToDate" };
    @computed get availableBalance() {
        return this.rootStore.userStore.userBalances.accountBalance;
    }

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
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
                Range: this.yearDropdownStore.value.id
            });

            this.dataGrants = {
                item: response.item.slice(0, 4),
                type: this.yearDropdownStore.value.code
            }

        } catch (err) {
            console.log(err);
        }
    }

    @action.bound
    async fetchCharityData() {
        this.yearDropdownStore.setValue({ name: (new Date().getFullYear()).toString(), id: new Date().getFullYear() });
        this.yearDropdownStore.setValue({ name: 'Year To Date', id: 2 });
        this.charity = await this.rootStore.application.charity.charityStore.getCharity(this.rootStore.userStore.applicationUser.id);
    }

    @action.bound
    async redirectToWithdrawFundsPage() {
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.withdraw'));
    }

    @action.bound
    async redirectToManageAccount() {
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.profile'));
    }
}

export default DashboardViewStore;
