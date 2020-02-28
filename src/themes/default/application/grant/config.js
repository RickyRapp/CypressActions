import { moduleProviderFactory } from 'core/providers';
import { GrantTab, GrantCreate, GrantEdit, ScheduledGrantEdit, GrantPreview } from 'application/grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grants',
                children: [
                    {
                        name: 'master.app.main.grant.tab',
                        pattern: '',
                        component: GrantTab,
                        authorization: 'theDonorsFundGrantSection.read'
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
                title: 'MENU.GRANTS',
                order: 7,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'grant',
                route: 'master.app.main.grant.tab'
            },
            {
                title: 'MENU.GRANTS',
                order: 7,
                route: 'master.app.main.grant.tab',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'grant'
            },
        ]
    });
})();
