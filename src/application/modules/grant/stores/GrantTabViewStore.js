import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

@applicationContext
class GrantTabViewStore extends BaseTabViewStore {
    donorId = null;

    constructor(rootStore) {
        super(rootStore);
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.update')) {
            this.donorId = rootStore.routerStore.routerState.params.id
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }

        this.loaderStore.resume();
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = Number(rootStore.routerStore.routerState.queryParams.tab);
        }

        this.selectDonorModal = new ModalParams({});
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorId })
            });
    }
}

export default GrantTabViewStore;