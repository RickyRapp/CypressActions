import { moduleProviderFactory } from 'core/providers';
import { UserList, UserEdit } from 'platform/modules/user/pages';
import { UserModuleStore } from 'platform/modules/user/stores';
import { getDefaultStoreKey } from 'core/utils';

(function () {
    moduleProviderFactory.platform.register({
        routes: [
            {
                name: 'master.platform.main.user',
                pattern: '/users',      
                isPrivate: true,
                children: [
                    {
                        name: 'master.platform.main.user.list',
                        pattern: '',
                        component: UserList
                    },
                    {
                        name: 'master.platform.main.user.edit',
                        pattern: '',
                        component: UserEdit
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Platform',
                subMenu: [
                    {
                        title: "Users",
                        route: "master.platform.main.user.list",
                        order: 2
                    }
                ]
            }
        ],
        storeFactory: function (context) {
            return { "platform.user": new UserModuleStore(context.rootStore) }
        }
    });
})();
