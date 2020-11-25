import { DonorService } from 'application/donor/services';
import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable donor = null;

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
                this.fetchDonorData()
            ]);
        }
    }

    @action.bound async fetchDonorData() {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await service.loadDonorData(this.rootStore.userStore.user.id);
        this.yearDropdownStore.setItems(response.data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } }));
        let initialValue = new Date().getFullYear();
        this.yearDropdownStore.setValue({ name: initialValue.toString(), id: initialValue });
        this.donor = response.data;
    }

    createYearDropdownStore() {
        this.yearDropdownStore = new BaasicDropdownStore();
    }
}

export default DashboardViewStore;
