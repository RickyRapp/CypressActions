import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        this.donorAccountId = rootStore.routerStore.routerState.params.id;
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = rootStore.routerStore.routerState.queryParams.tab;
        }
    }
}

export default DonorAccountTabViewStore;