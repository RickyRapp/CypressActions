import { 
    LoginViewStore, 
    PasswordRecoveryViewStore,
    PasswordChangeViewStore 
} from 'platform/modules/membership/stores';

class MembershipViewStore {
    routes = {
        register: () => this.rootStore.routerStore.navigate('master.platform.membership.register'),
        forgotPassword: () => this.rootStore.routerStore.navigate('master.platform.membership.password-recovery'),
        userPreferences: () => this.rootStore.routerStore.navigate('master.platform.main.user-preferences')
    }

    constructor(rootStore) {
        this.rootStore = rootStore;

        const moduleStore = rootStore.platform.membership;
        this.moduleStore = moduleStore;
        this.rootStore = moduleStore.rootStore;
        this.mainView = this.moduleStore.rootStore.viewStore;
        this.loginView = new LoginViewStore(rootStore);
        this.passwordRecoveryView = new PasswordRecoveryViewStore(rootStore);
        this.passwordChangeView = new PasswordChangeViewStore(rootStore);
    }
}

export default MembershipViewStore;