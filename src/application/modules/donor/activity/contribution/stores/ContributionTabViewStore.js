import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class ContributionTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore, 'tab');
        this.loaderStore.resume();
    }
}

export default ContributionTabViewStore;