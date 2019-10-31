import { moduleProviderFactory } from 'core/providers';
import { ScheduledGrantList, ScheduledGrantEdit } from 'application/scheduled-grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.scheduled-scheduled-grant',
                pattern: '/scheduled-grants',
                children: [
                    {
                        name: 'master.app.main.scheduled-grant.list',
                        pattern: '',
                        component: ScheduledGrantList,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "SCHEDULED_GRANT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.scheduled-grant.edit',
                        pattern: '/edit/:id/:editId',
                        component: ScheduledGrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "SCHEDULED_GRANT.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.GRANT',
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 7,
                subMenu: [
                    {
                        title: 'MENU.SCHEDULED_GRANTS',
                        order: 2,
                        route: 'master.app.main.scheduled-grant.list'
                    }
                ]
            },
            {
                title: 'MENU.SCHEDULED_GRANTS',
                order: 8,
                route: 'master.app.main.scheduled-grant.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'scheduled-grant'
            },
        ]
    });
})();
