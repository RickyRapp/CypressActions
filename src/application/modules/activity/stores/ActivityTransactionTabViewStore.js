import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class ActivityTransactionTabViewStore extends BaseTabViewStore {
    @observable donorId = null;

    constructor(rootStore) {
        super(rootStore, 'tab');
        this.loaderStore.resume();
    }

    @action.bound
    async onDonorChange(id) {
        this.donorId = id;
    }
}

export default ActivityTransactionTabViewStore;