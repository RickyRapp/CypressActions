import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { action, observable } from 'mobx';

@applicationContext
class GrantTabViewStore extends BaseTabViewStore {
    donorId = null;
    @observable canCreate = true;

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
            this.handleTabClick(rootStore.routerStore.routerState.queryParams.tab)
        }

        if (this.activeIndex === 2) {
            this.canCreate = false;
        }

        this.createFunc = () => {
            if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                this.openSelectDonorModal();
            }
            else {
                rootStore.routerStore.goTo('master.app.main.grant.create', { id: this.donorId });
            }
        }

        this.selectDonorModal = new ModalParams({});
    }

    @action.bound
    async handleTabClick(tabIndex) {
        await super.handleTabClick(tabIndex);
        if (this.activeIndex === 2) {
            this.canCreate = false;
        }
        else {
            this.canCreate = true;
        }
    }

    @action.bound
    setDonorId(id) {
        this.donorId = id;
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