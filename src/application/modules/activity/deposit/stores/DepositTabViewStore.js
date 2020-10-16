import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DepositTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore, 'tab');
        this.loaderStore.resume();
    }
}

export default DepositTabViewStore;