import { moduleProviderFactory } from 'core/providers';
import { ActivityTab } from 'application/donor/activity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.activity',
                pattern: '/activity',
                component: ActivityTab,
                data: {
                    title: "ACTIVITY_AND_HISTORY.LIST"
                }
            }
        ]
    });
})();
