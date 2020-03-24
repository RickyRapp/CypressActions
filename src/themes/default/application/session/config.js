import { moduleProviderFactory } from 'core/providers';
import { SessionTab, SessionEdit } from 'application/session/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.session',
                pattern: '/sessions',
                children: [
                    {
                        name: 'master.app.main.session.tab',
                        pattern: '',
                        component: SessionTab,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.LIST.TITLE"
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
                icon: 'session',
                route: 'master.app.main.session.tab'
            }
        ]
    });
})();
