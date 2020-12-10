import { moduleProviderFactory } from 'core/providers';
import { Dashboard } from 'application/donor/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.dashboard',
                pattern: '/dashboard',
                authorization: 'theDonorsFundDonorSection.read',
                component: Dashboard,
            },
        ]
    });
})();
