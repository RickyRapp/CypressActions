import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class GrantTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore, 'tab');
        this.loaderStore.resume();
    }
}

export default GrantTabViewStore;