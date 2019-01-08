import { action } from "mobx";
import { baasicStorageKeys } from 'core/utils';
import _ from 'lodash';

export default class LoginStore {
    moduleStore;
    
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.rootStore = moduleStore.rootStore;
    }

    @action async login({ username, password }) {
        const app = this.moduleStore.rootStore.platform.baasic;
        await app.membershipModule.login.login({ username, password });
        const token = app.getAccessToken();

        const tokenStorageKey = _.find(baasicStorageKeys, (k) => k.name === 'token').replace;
        const updatedToken = {
            ...token,
            isPlatform: true
        };
        app.tokenHandler.storageHandler.set(tokenStorageKey, updatedToken);
        this.rootStore.authStore.updateAccessToken(updatedToken);
    }

    @action.bound async logout() {
        const app = this.moduleStore.rootStore.platform.baasic;
        const { token, type } = app.getAccessToken();
        await app.membershipModule.login.logout(token, type);
        app.updateAccessToken(null);
    }
}