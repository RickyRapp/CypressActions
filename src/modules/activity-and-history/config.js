import { moduleProviderFactory } from 'core/providers';
import { ActivityAndHistoryList } from 'modules/activity-and-history/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.activity.and.history',
                pattern: '/activity-and-history',
                isPrivate: true,
                component: ActivityAndHistoryList,
                authorization: 'theDonorsFundDonorSection.read'
            },
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Activity And History',
                        route: 'master.app.main.activity.and.history',
                        order: 3
                    }
                ]
            }
        ]
    })
})();