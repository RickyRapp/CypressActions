import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class CharityDashboardViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }

}

export default CharityDashboardViewStore;
