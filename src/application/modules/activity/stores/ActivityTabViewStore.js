import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class ActivityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore, 'headerTab');
        this.loaderStore.resume();
    }
}

export default ActivityTabViewStore;