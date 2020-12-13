import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class UserViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'user',
            autoInit: true,
            routes: {
                edit: id => {
                    this.setChildNavigationTitle(i => i.id === id, item => item.userName);
                    this.rootStore.routerStore.goTo('master.app.main.administration.user.edit', { id: id });
                },
                create: () =>
                    this.rootStore.routerStore.goTo('master.app.main.administration.user.create')
            },
            actions: () => {
                const service = rootStore.application.baasic.membershipModule.user;
                return {
                    find: async (params) => {
                        const response = await service.find(params);
                        return response.data;
                    },
                    delete: service.delete
                }
            }
        });

        this.createTableStore();
    }

    @action.bound
    async onInit() {
        await this.queryUtility.initialize();
    }

    @action.bound
    async deleteUser(user) {
        this.loaderStore.suspend();
        await this.rootStore.application.baasic.membershipModule.user.delete(user);
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    @action.bound
    async lockUser(user) {
        this.loaderStore.suspend();
        await this.rootStore.application.baasic.membershipModule.user.lock(user);
        this.rootStore.notificationStore.success('Successfully locked user');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    @action.bound
    async unlockUser(user) {
        this.loaderStore.suspend();
        await this.rootStore.application.baasic.membershipModule.user.unlock(user);
        this.rootStore.notificationStore.success('Successfully unlocked user');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    @action.bound
    async approveUser(user) {
        this.loaderStore.suspend();
        await this.rootStore.application.baasic.membershipModule.user.approve(user);
        this.rootStore.notificationStore.success('Successfully approved user');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    @action.bound
    async disapproveUser(user) {
        this.loaderStore.suspend();
        await this.rootStore.application.baasic.membershipModule.user.disapprove(user);
        this.rootStore.notificationStore.success('Successfully disapproved user');
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'userName',
                    title: 'USER.LIST.COLUMNS.USERNAME'
                },
                {
                    key: 'email',
                    title: 'USER.LIST.COLUMNS.EMAIL',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'isApproved',
                    title: 'USER.LIST.COLUMNS.APPROVED',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                },
                {
                    key: 'isLockedOut',
                    title: 'USER.LIST.COLUMNS.LOCKED_OUT',
                    onClick: item => this.routes.edit(item.id),
                    authorization: this.authorization.update
                }
            ],
            actions: {
                onEdit: (user) => this.routes.edit(user.id),
                onLock: (user) => this.lockUser(user),
                onUnlock: (user) => this.unlockUser(user),
                onApprove: (user) => this.approveUser(user),
                onDisapprove: (user) => this.disapproveUser(user),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default UserViewStore;
