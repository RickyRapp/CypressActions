import { moduleProviderFactory } from 'core/providers';
import { Dashboard } from 'application/administration/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.dashboard',
                pattern: '/dashboard',
                component: Dashboard,
            },
        ]
    });
})();
