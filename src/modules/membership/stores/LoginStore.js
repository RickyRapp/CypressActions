import { action } from "mobx";

export default class LoginStore {
    moduleStore;
    
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.rootStore = moduleStore.rootStore;
    }

    @action async login({ username, password }) {
        const {
            app,
        } = this.moduleStore.rootStore;

        await app.baasic.membershipModule.login.login({ username, password });
    }

    @action.bound async logout() {
        const baasicApp = this.moduleStore.rootStore.app.baasic;
        const { token, type } = baasicApp.getAccessToken();
        await baasicApp.membershipModule.login.logout(token, type);
        baasicApp.updateAccessToken(null);
    }
}