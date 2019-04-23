import { LoginStore, RegisterStore } from 'modules/administration/membership/stores';

class MembershipModuleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loginStore = new LoginStore(this);
    this.registerStore = new RegisterStore(this);
  }
}

export default MembershipModuleStore;
