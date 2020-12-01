import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityActivityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
    }
}

export default CharityActivityTabViewStore;