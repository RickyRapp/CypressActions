import { observable, computed, runInAction } from 'mobx';
import { LoaderStore } from 'core/stores';

class UserStore {
    loaderStore = new LoaderStore();
    @observable.ref applicationUser = null;

    @computed get user() {
        return this.applicationUser;
    }

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @computed get resolving() {
        return this.loaderStore.loading;
    }

    async resolveUser() {
        this.loaderStore.suspend();
        const applicationUser = await this.resolveApplicationUser();

        runInAction(() => {
            this.applicationUser = applicationUser;

            this.loaderStore.resume();
        })
    }

    removeUser() {
        const { application } = this.rootStore;

        this.applicationUser = null;
        if (application && application.baasic) {
            application.baasic.setUser(null);
        }
    }

    async resolveApplicationUser() {
        const {
            authStore,
            application: { baasic: baasicApplication }
        } = this.rootStore;

        let user = null;

        if (authStore.isAuthenticated) {
            const response = await baasicApplication.membershipModule.login.loadUserData({ embed: 'permissions' });
            user = {
                ...response.data,
                isApplicationUser: true,
                apiKey: baasicApplication.getApiKey()
            };
        }
        baasicApplication.setUser(user);
        return user;
    }
}

export default UserStore;
