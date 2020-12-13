import { moduleProviderFactory } from 'core/providers';
import { Dashboard } from 'application/charity/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.dashboard',
                pattern: '/dashboard',
                authorization: '',
                component: Dashboard,
            },
        ]
    });
})();
