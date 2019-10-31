import { moduleProviderFactory } from 'core/providers';

import { Home } from 'application/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.dashboard',
                pattern: '',
                authorization: '',
                component: Home
            },
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                order: 10,
                route: 'master.app.main.dashboard',
                icon: 'dashboard'
            }
        ]
    });
})();
