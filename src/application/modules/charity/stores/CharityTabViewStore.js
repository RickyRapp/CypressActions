import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        this.charityId = rootStore.routerStore.routerState.params.id;
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = rootStore.routerStore.routerState.queryParams.tab;
        }
    }
}

export default CharityTabViewStore;