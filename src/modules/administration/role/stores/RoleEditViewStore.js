import { RoleEditForm } from 'modules/administration/role/forms';
import { BaseEditViewStore } from 'core/stores';

class RoleEditViewStore extends BaseEditViewStore {
  constructor(rootStore) {
    const roleService = rootStore.app.baasic.membershipModule.role;
    super(rootStore, {
      name: 'role',
      id: rootStore.routerStore.routerState.params.id,
      actions: {
        update: role => {
          return roleService.update(role);
        },
        get: async id => {
          const response = await roleService.get(id);
          return response.data;
        }
      },
      FormClass: RoleEditForm
    });
  }
}

export default RoleEditViewStore;
