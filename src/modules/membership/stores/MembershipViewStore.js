import {
  LoginViewStore,
  RegisterViewStore,
  PasswordRecoveryViewStore,
  PasswordChangeViewStore
} from 'modules/membership/stores';

class MembershipViewStore {
  routes = {
    register: () =>
      this.moduleStore.rootStore.routerStore.navigate(
        'master.app.membership.register'
      ),
    login: () =>
      this.moduleStore.rootStore.routerStore.navigate(
        'master.app.membership.login'
      ),
    forgotPassword: () =>
      this.moduleStore.rootStore.routerStore.navigate(
        'master.app.membership.password-recovery'
      ),
    userPreferences: () =>
      this.moduleStore.rootStore.routerStore.navigate(
        'master.app.main.user-preferences'
      )
  };

  constructor(rootStore) {
    this.rootStore = rootStore;

    const moduleStore = rootStore.app.membership;
    this.moduleStore = moduleStore;
    this.rootStore = moduleStore.rootStore;
    this.mainView = this.moduleStore.rootStore.viewStore;
    this.loginView = new LoginViewStore(rootStore);
    this.registerView = new RegisterViewStore(rootStore);
    this.passwordRecoveryView = new PasswordRecoveryViewStore(rootStore);
    this.passwordChangeView = new PasswordChangeViewStore(rootStore);
  }
}

export default MembershipViewStore;
