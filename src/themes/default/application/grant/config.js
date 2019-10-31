import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantCreate, GrantEdit } from 'application/grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grants',
                children: [
                    {
                        name: 'master.app.main.grant.list',
                        pattern: '',
                        component: GrantList,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.create',
                        pattern: '/create/:id',
                        component: GrantCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        data: {
                            title: "GRANT.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.edit',
                        pattern: '/edit/:id/:editId',
                        component: GrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.GRANT',
                order: 7,
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.GRANTS',
                        order: 1,
                        route: 'master.app.main.grant.list'
                    }
                ]
            },
            {
                title: 'MENU.GRANTS',
                order: 7,
                route: 'master.app.main.grant.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'grant'
            },
        ]
    });
})();
