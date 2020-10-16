import { moduleProviderFactory } from 'core/providers';
import { UserList, UserEdit, UserCreate } from 'application/administration/user/pages';
import { noApplicationRedirectPromise } from 'core/utils';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.user',
                pattern: '/users',
                children: [
                    {
                        name: 'master.app.main.user.list',
                        pattern: '',
                        component: UserList,
                        authorization: 'coreUserSection.read',
                        data: {
                            title: "USER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.user.create',
                        pattern: '/create',
                        component: UserCreate,
                        authorization: 'coreUserSection.create',
                        data: {
                            title: "USER.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.user.edit',
                        pattern: '/edit/:id',
                        component: UserEdit,
                        authorization: 'coreUserSection.update',
                        data: {
                            title: "USER.EDIT.TITLE"
                        },
                        beforeEnter: (fromState, toState, routerStore) => {
                            return noApplicationRedirectPromise(routerStore.rootStore, 'master.app.main.user.list');
                        }
                    },

                ]
            }
        ],
        menu: [
            {
                title: 'MENU.USERS',
                order: 6,
                route: 'master.app.main.user.list',
                role: ['Administrators']
            },
        ]
    });
})();
