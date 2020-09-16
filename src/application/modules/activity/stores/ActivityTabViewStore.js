import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class ActivityTabViewStore extends BaseViewStore {
    activeHeaderTab = 1;

    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();

        if (rootStore.routerStore.getCurrentRoute().name === 'master.app.main.activity.transactions') {
            this.activeHeaderTab = 1;
        }
        else if (rootStore.routerStore.getCurrentRoute().name === 'master.app.main.activity.deposits') {
            this.activeHeaderTab = 2;
        }
        else if (rootStore.routerStore.getCurrentRoute().name === 'master.app.main.activity.grants') {
            this.activeHeaderTab = 3;
        }
    }

    @action.bound handleHeaderTabClick(index) {
        if (this.activeHeaderTab === index) {
            return;
        }

        if (index === 1) {
            this.rootStore.routerStore.goTo('master.app.main.activity.transactions')
        }
        else if (index === 2) {
            this.rootStore.routerStore.goTo('master.app.main.activity.deposits')
        }
        else if (index === 3) {
            this.rootStore.routerStore.goTo('master.app.main.activity.grants')
        }
    }
}

export default ActivityTabViewStore;