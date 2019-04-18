import { LoginViewStore, RegisterViewStore, PasswordRecoveryViewStore, PasswordChangeViewStore } from 'modules/membership/stores';

class MembershipViewStore {
  routes = {
    register: () => this.rootStore.routerStore.navigate('master.app.administration.membership.register'),
    login: () => this.rootStore.routerStore.navigate('master.app.administration.membership.login'),
    forgotPassword: () => this.moduleStore.rootStore.routerStore.navigate('master.app.administration.membership.password-recovery'),
    userPreferences: () => this.moduleStore.rootStore.routerStore.navigate('master.app.administration.membership.user-preferences')
  };

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default MembershipViewStore;
