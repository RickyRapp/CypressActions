import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        this.charityId = rootStore.routerStore.routerState.params.id;
    }
}

export default CharityTabViewStore;