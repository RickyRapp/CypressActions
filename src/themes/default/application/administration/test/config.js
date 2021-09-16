import { moduleProviderFactory } from 'core/providers';
import { TestTab } from 'application/administration/test/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.test',
                pattern: '/testing',
                children: [
                    {
                        name: 'master.app.main.administration.test.tab',
                        pattern: '',
                        component: TestTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "MENU.TESTING"
                        }
                    }
                ]
            }
        ]
    });
})();
