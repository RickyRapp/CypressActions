import { moduleProviderFactory } from 'core/providers';
import { CharityActivityTab } from 'application/charity-activity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity-activity',
                pattern: '/transactions',
                children: [
                    {
                        name: 'master.app.main.charity-activity.list',
                        pattern: '',
                        component: CharityActivityTab,
                        authorization: 'theDonorsFundCharitySection.read',
                        data: {
                            title: "CHARITY_ACTIVITY.TAB_TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();
