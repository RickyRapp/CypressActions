import { observable, action } from "mobx";
import { BaseViewStore } from 'core/stores';

class MainViewStore extends BaseViewStore {
    @observable profileMenuOpen = false;

    constructor(rootStore) {
        super(rootStore);
    }

    @action.bound toggleProfileMenu(e) {
        this.profileMenuOpen = !this.profileMenuOpen;
    }

    @action.bound setProfileMenu(visible) {
        this.profileMenuOpen = visible;
    }

    @action.bound async logout() {
        const app = this.rootStore.getBaasicApp();
        const token = app.getAccessToken();

        const endSession = async (baasicApp, isPlatform) => {
            await baasicApp.membershipModule.login.logout(token.token, token.type);
            this.rootStore.authStore.resetSignInRedirect();
            baasicApp.updateAccessToken(null);
            await this.rootStore.routerStore.navigate(this.rootStore.getLoginRoute());
        }

        if (token) {
            await endSession(app, false);
        }
    }
}

export default MainViewStore;