import { UserStore } from "platform/modules/user/stores";

class UserModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.userStore = new UserStore(this);
    }
}

export default UserModuleStore;