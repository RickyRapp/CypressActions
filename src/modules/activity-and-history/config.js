import { moduleProviderFactory } from 'core/providers';
import { ActivityAndHistoryAdministrationList, ActivityAndHistoryMainList } from 'modules/activity-and-history/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.activity.and.history',
                pattern: 'activity-and-history',
                isPrivate: true,
                component: ActivityAndHistoryAdministrationList
            },
            {
                name: 'master.app.main.activity.and.history',
                pattern: 'activity-and-history',
                isPrivate: true,
                component: ActivityAndHistoryMainList,
                authorization: 'theDonorsFundDonorSection.read',
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Activity And History',
                        route: 'master.app.main.activity.and.history',
                        order: 1
                    },
                    {
                        title: 'Activity And History',
                        route: 'master.app.administration.activity.and.history',
                        order: 1
                    }
                ]
            }
        ]
    })
})();