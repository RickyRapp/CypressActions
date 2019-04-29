import { action, observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from 'core/stores';

class UserListViewStore extends BaseListViewStore {
  @observable filterVisible = false;
  constructor(rootStore) {
    const userService = rootStore.app.baasic.membershipModule.user;
    super(rootStore, {
      name: 'user',
      routes: {
        detail: id =>
          this.rootStore.routerStore.navigate('master.app.administration.user.preview', {
            id
          }),
        edit: id =>
          this.rootStore.routerStore.navigate('master.app.administration.user.edit', {
            id: id
          }),
        create: () => this.rootStore.routerStore.navigate('master.app.administration.user.create')
      },
      actions: {
        find: async params => {
          const response = await userService.find(params);
          return response.data;
        },
        delete: user => {
          return userService.remove(user);
        },
        lock: user => {
          return userService.lock(user);
        },
        unlock: user => {
          return userService.unlock(user);
        },
        approve: user => {
          return userService.approve(user);
        },
        disapprove: user => {
          return userService.disapprove(user);
        }
      }
    });

    this.setTableStore(
      new TableViewStore(this.queryUtility, {
        columns: [
          {
            key: 'userName',
            title: 'Username',
            onClick: user => this.routes.edit(user.id)
          },
          {
            key: 'displayName',
            title: 'Display name'
          },
          {
            key: 'email',
            title: 'Email'
          }
        ],
        actions: {
          onEdit: user => this.routes.edit(user.id),
          onLock: user => this.lockUser(user),
          onUnlock: user => this.unlockUser(user),
          onApprove: user => this.approveUser(user),
          onDisapprove: user => this.disapproveUser(user),
          onSort: column => this.queryUtility.changeOrder(column.key)
        }
      })
    );
  }

  @action.bound async deleteUser(user) {
    this.loaderStore.suspend();
    await this.actions.delete(user);
    await this.queryUtility.fetch();
    this.loaderStore.resume();
  }

  @action.bound async lockUser(user) {
    this.loaderStore.suspend();
    await this.actions.lock(user);
    this.rootStore.notificationStore.success('Successfully locked user');
    await this.queryUtility.fetch();
    this.loaderStore.resume();
  }

  @action.bound async unlockUser(user) {
    this.loaderStore.suspend();
    await this.actions.unlock(user);
    this.rootStore.notificationStore.success('Successfully unlocked user');
    await this.queryUtility.fetch();
    this.loaderStore.resume();
  }

  @action.bound async approveUser(user) {
    this.loaderStore.suspend();
    await this.actions.approve(user);
    this.rootStore.notificationStore.success('Successfully approved user');
    await this.queryUtility.fetch();
    this.loaderStore.resume();
  }

  @action.bound async disapproveUser(user) {
    this.loaderStore.suspend();
    await this.actions.disapprove(user);
    this.rootStore.notificationStore.success('Successfully disapproved user');
    await this.queryUtility.fetch();
    this.loaderStore.resume();
  }

  @action async getUser() { }
}

export default UserListViewStore;
