import { action, runInAction, observable } from 'mobx';
import { BaseQueryStore } from 'core/stores';

class UserStore {
    @observable roles = [];

    constructor(moduleStore) {
        this.moduleStore = moduleStore;
        this.userService = this.moduleStore.rootStore.platform.baasic.membershipModule.user;

        this.findUsers = this.findUsers.bind(this);
        this.createUser = this.createUser.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.getUser = this.getUser.bind(this);
        this.fetchRoles = this.fetchRoles.bind(this);
        this.lockUser = this.lockUser.bind(this);
        this.unlockUser = this.unlockUser.bind(this);
        this.approveUser = this.approveUser.bind(this);
        this.disapproveUser = this.disapproveUser.bind(this);
    }

    @action async findUsers(filter) {
        const response = await this.userService.find(filter);
        return response.data;
    }

    @action async createUser(user) {
        await this.userService.create(user);
    }

    @action async updateUser(user) {
        await this.userService.update(user);
    }

    @action async deleteUser(user) {
        await this.userService.remove(user);
    }

    @action async getUser(id, options = { embed: 'roles' }) {
        const response = await this.userService.get(id, options);
        return response.data;
    }

    @action async fetchRoles() {
        const response = await this.moduleStore.rootStore.platform.baasic.membershipModule.lookups.get({ embed: 'role' });
        return response.data.role;
    }

    @action.bound async lockUser(user) {
        await this.userService.lock(user);
    }

    @action.bound async unlockUser(user) {
        await this.userService.unlock(user);
    }

    @action.bound async approveUser(user) {
        await this.userService.approve(user);
    }

    @action.bound async disapproveUser(user) {
        await this.userService.disapprove(user);
    }
}

export default UserStore;