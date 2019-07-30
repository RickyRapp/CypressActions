import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantScheduledPaymentList } from 'modules/administration/grant/pages'
import { GrantCombinedDetails } from 'modules/common/grant/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.grant',
                pattern: '/grant',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.grant.list',
                        pattern: '',
                        component: GrantList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.grant.details',
                        pattern: 'details/:id',
                        component: GrantCombinedDetails,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.grant.scheduled.list',
                        pattern: '/scheduled',
                        component: GrantScheduledPaymentList,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Grants',
                        route: 'master.app.administration.grant.list',
                        order: 7
                    },
                    {
                        title: 'Scheduled Grants',
                        route: 'master.app.administration.grant.scheduled.list',
                        order: 8
                    }
                ]
            }
        ]
    })
})();