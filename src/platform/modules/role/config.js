import { moduleProviderFactory } from 'core/providers';
import { RoleList } from 'platform/modules/role/pages';
import { RoleModuleStore } from 'platform/modules/role/stores';
import { getDefaultStoreKey } from 'core/utils';

(function () {
    moduleProviderFactory.platform.register({
        routes: [
            {
                name: 'master.platform.main.role',
                pattern: '/roles',
                isPrivate: true,
                children: [
                    {
                        name: 'master.platform.main.role.list',
                        pattern: '',
                        component: RoleList
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Platform',                
                subMenu: [
                    {
                        title: "Roles",
                        route: "master.platform.main.role.list",
                        order: 3,
                    }
                ]
            }
        ],
        storeFactory: function (context) {
            return {
                "platform.role": new RoleModuleStore(context.rootStore),
            }
        },
    });
})();