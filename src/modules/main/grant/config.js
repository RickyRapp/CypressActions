import { moduleProviderFactory } from 'core/providers';
import { GrantScheduledPaymentList } from 'modules/main/grant/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.grant.scheduled.list',
                        pattern: '/scheduled',
                        component: GrantScheduledPaymentList,
                        authorization: 'theDonorsFundGrantSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Scheduled Grants',
                        route: 'master.app.main.grant.scheduled.list',
                        order: 8
                    }
                ]
            }
        ]
    })
})();