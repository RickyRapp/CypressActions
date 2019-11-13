import { action } from 'mobx';
import { RoleEditForm } from 'application/administration/role/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class RoleEditViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;

        super(rootStore, {
            name: 'role',
            id: id,
            Form: RoleEditForm,
            actions: () => {
                const service = rootStore.application.baasic.membershipModule.role;
                return {
                    get: async (id, opts) => {
                        const response = await service.get(id, opts);
                        return response.data;
                    },
                    update: async (resource) => {
                        const response = await service.update(resource);
                        return response.data;
                    },
                    create: async (resource) => {
                        const response = await service.create(resource);
                        return response.data;
                    }
                }
            },
            FormClass: RoleEditForm,
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }
}

export default RoleEditViewStore;
