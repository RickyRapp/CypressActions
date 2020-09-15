import { DonorService } from 'application/donor/services';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable donor = null;

    constructor(rootStore) {
        super(rootStore);
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
        this.donor = response.data;
    }
}

export default DashboardViewStore;
