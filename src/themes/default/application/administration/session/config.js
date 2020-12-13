import { moduleProviderFactory } from 'core/providers';
import { SessionTab, SessionEdit, SessionPreview } from 'application/administration/session/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.session',
                pattern: '/sessions',
                children: [
                    {
                        name: 'master.app.main.administration.session.tab',
                        pattern: '',
                        component: SessionTab,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.session.edit',
                        pattern: '/edit/:id',
                        component: SessionEdit,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "SESSION.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.session.preview',
                        pattern: '/preview/:id',
                        component: SessionPreview,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "SESSION.PREVIEW.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();
