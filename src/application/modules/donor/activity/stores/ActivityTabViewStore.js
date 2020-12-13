import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class ActivityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore, 'headerTab');
        this.loaderStore.resume();
    }

    async handleTabClick(tabIndex, tabQueryParams = {}) {
        const { queryParams } = this.rootStore.routerStore.routerState;
        queryParams.tab = 0;
        await this.rootStore.routerStore.setQueryParams({ ...queryParams });
        super.handleTabClick(tabIndex, tabQueryParams)
    }
}

export default ActivityTabViewStore;