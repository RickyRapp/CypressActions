import { moduleProviderFactory } from 'core/providers';
import { ActivityTab } from 'application/charity/activity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.activity',
                pattern: '/transactions',
                component: ActivityTab,
                authorization: 'theDonorsFundCharitySection.read',
                data: {
                    title: "CHARITY_ACTIVITY.TAB_TITLE"
                }
            }
        ]
    });
})();
