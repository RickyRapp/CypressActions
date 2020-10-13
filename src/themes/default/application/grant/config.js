import { moduleProviderFactory } from 'core/providers';
import { GrantTab, GrantCreate, GrantEdit, ScheduledGrantEdit, GrantPreview } from 'application/grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.grant.create',
                        pattern: '/create/:id?',
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
                    },
                    {
                        name: 'master.app.main.grant.scheduled-edit',
                        pattern: '/scheduled-edit/:id/:editId',
                        component: ScheduledGrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        data: {
                            title: "GRANT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.grant.preview',
                        pattern: '/preview/:editId',
                        component: GrantPreview,
                        authorization: 'theDonorsFundGrantSection.read',
                        data: {
                            title: "GRANT.PREVIEW.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.GIVE',
                order: 2,
                role: ['Users'],
                icon: 'grant',
                subMenu: [
                    {
                        title: 'MENU.NEW_GRANT',
                        order: 1,
                        route: 'master.app.main.grant.create'
                    },
                    {
                        title: 'MENU.NEW_PLEDGE',
                        order: 2,
                        route: 'master.app.main.booklet-order.create'
                    },
                    {
                        title: 'MENU.NEW_REMAINDER',
                        order: 3,
                        route: 'master.app.main.grant.create'
                    }
                ]
            },
        ]
    });
})();
