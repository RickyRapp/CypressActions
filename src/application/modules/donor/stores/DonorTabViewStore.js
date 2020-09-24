import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorTabViewStore extends BaseTabViewStore {
    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.donorId = rootStore.routerStore.routerState.params.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = Number(rootStore.routerStore.routerState.queryParams.tab);
        }
    }
}

export default DonorTabViewStore;