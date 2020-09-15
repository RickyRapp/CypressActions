import { moduleProviderFactory } from 'core/providers';
import { Dashboard } from 'application/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.dashboard',
                pattern: '',
                authorization: '',
                component: Dashboard
            },
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                order: 2,
                route: 'master.app.main.dashboard',
                icon: 'dashboard'
            }
        ]
    });
})();
