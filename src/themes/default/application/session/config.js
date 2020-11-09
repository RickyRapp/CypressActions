import { moduleProviderFactory } from 'core/providers';
import { SessionTab, SessionEdit, SessionPreview, SessionCreate } from 'application/session/pages';
import { SessionModuleStore } from 'application/session/stores';
import { MainLayout, MasterLayout, PublicLayout } from 'core/layouts';

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
                        pattern: '/edit/:id',
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
                route: 'master.app.main.session.tab'
            }
        ],
        moduleStore: function (context) {
            return {
                'application.session': new SessionModuleStore(context.rootStore),
            };
        },
    });
})();
