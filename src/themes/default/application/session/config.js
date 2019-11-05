import { moduleProviderFactory } from 'core/providers';
import { SessionList, SessionCreate, SessionInProgressList, SessionEdit } from 'application/session/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.session',
                pattern: '/sessions',
                children: [
                    {
                        name: 'master.app.main.session.list',
                        pattern: '',
                        component: SessionList,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.session.list.in-progress',
                        pattern: 'in-progress',
                        component: SessionInProgressList,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.LIST.IN_PROGRESS.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.session.create',
                        pattern: 'create',
                        component: SessionCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "SESSION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.session.edit',
                        pattern: 'edit/:id',
                        component: SessionEdit,
                        authorization: 'theDonorsFundAdministrationSection.edit',
                        data: {
                            title: "SESSION.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.SESSION',
                order: 8,
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.SESSIONS',
                        order: 1,
                        route: 'master.app.main.session.list'
                    },
                    {
                        title: 'MENU.SESSION_IN_PROGRESS',
                        order: 2,
                        route: 'master.app.main.session.list.in-progress'
                    }
                ]
            }
        ]
    });
})();
