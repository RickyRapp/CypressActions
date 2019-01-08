import { LoginStore, PasswordRecoveryStore } from 'platform/modules/membership/stores';

class MembershipModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.loginStore = new LoginStore(this);
        this.passwordRecoveryStore = new PasswordRecoveryStore(this);
    }
}

export default MembershipModuleStore;