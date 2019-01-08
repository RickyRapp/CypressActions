import { observable, action, runInAction } from 'mobx';

class RoleStore {
    @observable item = null;

    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.rootStore = moduleStore.rootStore;

        this.roleService = this.moduleStore.rootStore.platform.baasic.membershipModule.role;
    }

    @action async findRoles(filter) {
        const response = await this.roleService.find(filter);
        return response.data;
    }

    @action async getRole(id) {
        const role = await this.roleService.get(id);
        return role.data;
    }

    @action async updateRole(role) {
        await this.roleService.update(role);        
    }

    @action async createRole(role) {
        await this.roleService.create(role);
    }

    @action async deleteRole(role) {
        await this.roleService.remove(role);
    }
}

export default RoleStore;