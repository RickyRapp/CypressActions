class MembershipViewStore {
  routes = {
    register: () => this.rootStore.routerStore.navigate('master.app.administration.membership.register'),
    login: () => this.rootStore.routerStore.navigate('master.public.membership.login'),
    forgotPassword: () => this.moduleStore.rootStore.routerStore.navigate('master.public.administration.membership.password-recovery'),
    userPreferences: () => this.moduleStore.rootStore.routerStore.navigate('master.app.administration.membership.user-preferences')
  };

  constructor(rootStore) {
    this.rootStore = rootStore;
  }
}

export default MembershipViewStore;
