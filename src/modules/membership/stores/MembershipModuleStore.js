import { LoginStore, RegisterStore } from 'modules/membership/stores';

class MembershipModuleStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.loginStore = new LoginStore(this);
    this.registerStore = new RegisterStore(this);
  }
}

export default MembershipModuleStore;
