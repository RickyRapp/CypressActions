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
                title: 'MENU.TESTING',
                order: 8,
                route: 'master.app.main.administration.test-tab',
                role: ['Administrators']
            },
        ]

    });
})();
