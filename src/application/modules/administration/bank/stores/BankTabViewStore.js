import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class BankTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = rootStore.routerStore.routerState.queryParams.tab;
        }
    }
}

export default BankTabViewStore;