import { action } from "mobx";

export default class RegisterStore {
    moduleStore;
    
    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.rootStore = moduleStore.rootStore;
    }

    @action async register({ username, email, password, confirmPassword }) {
        const baasicApp = this.moduleStore.rootStore.app.baasic;

        const activationUrl = `${window.location.origin}/account-activation?activationToken={activationToken}`;
        await baasicApp.membershipModule.register.create({ username, email, password, confirmPassword, activationUrl });    
    }

    @action.bound async activate(activationToken) {
        const baasicApp = this.moduleStore.rootStore.app.baasic;
        await baasicApp.membershipModule.register.activate(activationToken);
    }

}