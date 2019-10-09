import {
    TableViewStore,
    BaseListViewStore
} from 'core/stores';
import applicationContext from 'core/utils/applicationContext';

@applicationContext
class RoleViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'role',
            autoInit: true,
            routes: {
                edit: id => {
                    this.setChildNavigationTitle(i => i.id === id, r => r.name);
                    return this.rootStore.routerStore.goTo(
                        'master.app.main.role.edit',
                        { id: id }
                    )
                }
            },
            actions: () => {
                const service = rootStore.application.baasic.membershipModule.role;
                return {
                    find: async (params) => {
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'ROLE.LIST.COLUMNS.NAME'
                },
                {
                    key: 'description',
                    title: 'ROLE.LIST.COLUMNS.DESCRIPTION'
                }
            ],
            actions: {
                onEdit: async (item) => this.routes.edit(item.id)
            }
        }));
    }
}

export default RoleViewStore;
