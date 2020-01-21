import { observable, action } from 'mobx';
import { BaseViewStore } from 'core/stores';

class BaseTabViewStore extends BaseViewStore {
    @observable activeIndex = 0;
    @observable activeComponent = null;
    config = null;

    constructor(rootStore) {
        super(rootStore);
    }

    @action
    async handleTabClick(tabIndex) {
        this.activeIndex = tabIndex;
        this.rootStore.routerStore.setQueryParams({ tab: this.activeIndex });
    }
}

export default BaseTabViewStore;
