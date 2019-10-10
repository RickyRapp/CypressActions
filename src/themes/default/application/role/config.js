import { moduleProviderFactory } from 'core/providers';
import { RoleList, RoleEdit } from 'application/role/pages';
import { noApplicationRedirectPromise } from 'core/utils';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.role',
                pattern: '/roles',
                children: [
                    {
                        name: 'master.app.main.role.list',
                        pattern: '',
                        component: RoleList,
                        authorization: 'coreRoleSection.read',
                        data: {
                            title: 'ROLE.LIST.TITLE'
                        }
                    },
                    {
                        name: 'master.app.main.role.edit',
                        pattern: '/:id',
                        component: RoleEdit,
                        authorization: 'coreRoleSection.update',
                        data: {
                            title: 'ROLE.EDIT.TITLE'
                        },
                        beforeEnter: (fromState, toState, routerStore) => {
                            return noApplicationRedirectPromise(routerStore.rootStore, 'master.app.main.role.list');
                        }
                    },
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.ROLES',
                        order: 2,
                        route: 'master.app.main.role.list'
                    },
                ]
            }
        ]
    });
})();

