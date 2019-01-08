import { RoleStore } from 'platform/modules/role/stores';

class RoleModuleStore {
    constructor(rootStore) {
        this.rootStore = rootStore;
        this.roleStore = new RoleStore(this);        
    }
}

export default RoleModuleStore;