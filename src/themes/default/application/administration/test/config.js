import { moduleProviderFactory } from 'core/providers';
import { TestTab } from 'application/administration/test/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration',
                pattern: '/',
                children: [
                    {
                        name: 'master.app.main.administration.test-tab',
                        pattern: 'testing',
                        component: TestTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "MENU.TESTING"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                order: 9,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.TESTING',
                        order: 2,
                        route: 'master.app.main.administration.test-tab'
                    },
                ]
            }
        ]
    });
})();
