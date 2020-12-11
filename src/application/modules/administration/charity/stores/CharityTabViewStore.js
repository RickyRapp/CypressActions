import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class CharityTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.charityId = rootStore.routerStore.routerState.params.id;
        }
        else {

            this.charityId = rootStore.userStore.user.charityId;
        }
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = Number(rootStore.routerStore.routerState.queryParams.tab);
        }
    }
}

export default CharityTabViewStore;