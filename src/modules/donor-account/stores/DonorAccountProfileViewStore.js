import { BaseViewStore } from 'core/stores';

class DonorAccountProfileViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore);

        this.userId = rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id;

        this.permissions = {
            administrationRead: rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read'),
            mainUpdate: rootStore.authStore.hasPermission('theDonorsFundSection.update'),
        }
    }
}

export default DonorAccountProfileViewStore;