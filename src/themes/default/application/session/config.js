import { moduleProviderFactory } from 'core/providers';
import { SessionTab, SessionEdit, SessionPreview } from 'application/session/pages';

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
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "SESSION.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.session.preview',
                        pattern: '/preview/:id',
                        component: SessionPreview,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.PREVIEW.TITLE"
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
