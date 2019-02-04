import { BaseListViewStore, TableViewStore } from 'core/stores';

class RoleListViewStore extends BaseListViewStore {
  constructor(rootStore) {
    const roleService = rootStore.app.baasic.membershipModule.role;

    super(rootStore, {
      name: 'role',
      routes: {
        edit: id =>
          this.rootStore.routerStore.navigate('master.app.main.role.edit', {
            id: id
          }),
        create: () =>
          this.rootStore.routerStore.navigate('master.app.main.role.create')
      },
      actions: {
        find: async filter => {
          const response = await roleService.find(filter);
          return response.data;
        },
        delete: id => {
          return roleService.remove(id);
        }
      }
    });

    this.setTableStore(
      new TableViewStore(this.queryUtility, {
        columns: [
          {
            key: 'name',
            title: 'Name',
            onClick: role => this.routes.edit(role.id)
          },
          {
            key: 'description',
            title: 'Description'
          }
        ],
        actions: {
          onEdit: async item => this.routes.edit(item.id),
          onDelete: this.deleteResource,
          onSort: column => this.queryUtility.changeOrder(column.key)
        },
        onRowClick: item => this.routes.edit(item.id)
      })
    );
  }
}

export default RoleListViewStore;
