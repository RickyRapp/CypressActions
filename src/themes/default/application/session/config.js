import { moduleProviderFactory } from 'core/providers';
import { SessionTab, SessionEdit, SessionPreview, SessionCreate, ReviewCertificate } from 'application/session/pages';
import { PublicLayout } from 'core/layouts';

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
                        name: 'master.app.main.session.create',
                        pattern: 'create',
                        component: SessionCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "SESSION.CREATE.TITLE"
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
            },
            {
                name: 'master.app.review',
                pattern: '/review-certificate',
                component: [PublicLayout],
                beforeEnter: async (fromState, toState, routerStore) => {
                    const { rootStore } = routerStore;
                    await rootStore.userStore.resolveUser();
                },
                children: [
                    {
                        name: 'master.app.review.certificate',
                        pattern: '/:reviewToken',
                        component: ReviewCertificate,
                        authorization: 'theDonorsFundDonorSection.read',
                    },
                ],
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
