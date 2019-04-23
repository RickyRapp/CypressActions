import { moduleProviderFactory } from 'core/providers';
import { ActivityAndHistoryList } from 'modules/main/activity-and-history/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.activity-and-history',
                pattern: 'activity-and-history',
                isPrivate: true,
                component: ActivityAndHistoryList,
                authorization: 'theDonorsFundDonorSection.read',
                withoutAuthorization: 'theDonorsFundAdministrationSection.read',
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Activity And History',
                        route: 'master.app.main.activity-and-history',
                        order: 1
                    }
                ]
            }
        ]
    })
})();