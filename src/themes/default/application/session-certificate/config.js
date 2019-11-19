import { moduleProviderFactory } from 'core/providers';
import { SessionCertificateList } from 'application/session-certificate/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.session-certificate',
                pattern: '/session-certificates',
                children: [
                    {
                        name: 'master.app.main.session-certificate.list',
                        pattern: '',
                        component: SessionCertificateList,
                        data: {
                            title: "SESSION_CERTIFICATE.LIST.TITLE"
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
                icon: 'session-certificate',
                subMenu: [
                    {
                        title: 'MENU.SESSION_CERTIFICATES',
                        order: 4,
                        route: 'master.app.main.session-certificate.list'
                    }
                ]
            },
            {
                title: 'MENU.SESSION_CERTIFICATES',
                order: 9,
                route: 'master.app.main.session-certificate.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'session-certificate'
            },
            {
                title: 'MENU.SESSION_CERTIFICATES',
                order: 2,
                route: 'master.app.main.session-certificate.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Charities'); },
                icon: 'session-certificate'
            }
        ]
    });
})();
