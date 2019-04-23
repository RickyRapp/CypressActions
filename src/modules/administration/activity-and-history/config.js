import { moduleProviderFactory } from 'core/providers';
import { ActivityAndHistoryList } from 'modules/administration/activity-and-history/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.activity-and-history',
                pattern: 'activity-and-history',
                component: ActivityAndHistoryList,
                authorization: 'theDonorsFundAdministrationSection.read'
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Activity And History',
                        route: 'master.app.administration.activity-and-history',
                        order: 1
                    }
                ]
            }
        ]
    })
})();