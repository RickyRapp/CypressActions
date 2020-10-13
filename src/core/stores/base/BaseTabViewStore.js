import { observable, action } from 'mobx';
import { BaseViewStore } from 'core/stores';

class BaseTabViewStore extends BaseViewStore {
    @observable activeIndex = 0;

    constructor(rootStore, tabParamName = 'tab') {
        super(rootStore);
        this.tabParamName = tabParamName

        const tab = rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams[this.tabParamName];
        this.activeIndex = +tab || 0;
    }

    @action
    async handleTabClick(tabIndex, tabQueryParams = {}) {
        const { params, queryParams } = this.rootStore.routerStore.routerState;

        this.activeIndex = tabIndex;
        tabQueryParams[this.tabParamName] = tabIndex;

        if (queryParams.page) {
            queryParams.page = 1;
        }

        await this.rootStore.routerStore.goTo(this.rootStore.routerStore.getCurrentRoute().name, { ...params });
        await this.rootStore.routerStore.setQueryParams({ ...queryParams, ...tabQueryParams });
    }
}

export default BaseTabViewStore;
