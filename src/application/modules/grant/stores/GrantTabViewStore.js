import { BaseTabViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext, donorAccountFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { DonorAccountService } from 'application/donor-account/services';
import { action } from 'mobx';

@applicationContext
class GrantTabViewStore extends BaseTabViewStore {
    donorAccountId = null;

    constructor(rootStore) {
        super(rootStore);
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id;
        this.loaderStore.resume();
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.tab) {
            this.activeIndex = rootStore.routerStore.routerState.queryParams.tab;
        }

        this.createFunc = () => {
            if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                this.openSelectDonorModal();
            }
            else {
                rootStore.routerStore.goTo('master.app.main.grant.create', { id: id });
            }
        }

        this.selectDonorModal = new ModalParams({});
    }

    @action.bound
    setDonorAccountId(id) {
        this.donorAccountId = id;
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorAccountId: this.donorAccountId,
                onClickDonorFromFilter: (donorAccountId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId }),
                onChange: (donorAccountId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId })
            });
    }

}

export default GrantTabViewStore;