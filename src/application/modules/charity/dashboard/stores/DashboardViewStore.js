import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable charity = null;

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
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
        
        this.charity = { name: 'test', taxId: 123456789 }
    }
}

export default DashboardViewStore;
