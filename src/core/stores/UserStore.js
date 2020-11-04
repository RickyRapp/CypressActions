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
            application: { baasic: baasicApplication, charity, donor }
        } = this.rootStore;

        let user = null;

        if (authStore.isAuthenticated) {
            const response = await baasicApplication.membershipModule.login.loadUserData({ embed: 'permissions' });
            user = {
                ...response.data,
                isApplicationUser: true,
                apiKey: baasicApplication.getApiKey()
            };
            await this.getCharityProfile(user, charity);
            await this.getDonorProfile(user, donor);
        }
        baasicApplication.setUser(user);
        return user;
    }

    async getDonorProfile(user, donor) {
        try {
            if (user.roles.includes('User')) {
                const data = await donor.donorStore.getDonorLoginProfile(user.id);
                if (data) {

                }
            }
        } catch (ex) {
            // eslint-disable-line
        }
    }

    async getCharityProfile(user, charity) {
        try {
            if (user.roles.includes('Charities')) {
                const data = await charity.charityStore.getCharityLoginProfile(user.id);
                if (data) {
                    user.charityId = data.id;
                }
            }
        } catch (ex) {
            // eslint-disable-line
        }
    }

}

export default UserStore;
