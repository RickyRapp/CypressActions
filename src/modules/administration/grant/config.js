import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantCombinedList, GrantScheduledPaymentList, GrantCreate, GrantEdit } from 'modules/administration/grant/pages'

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
                        name: 'master.app.administration.grant.combined-list',
                        pattern: 'combined-list/:id',
                        component: GrantCombinedList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.grant.scheduled.list',
                        pattern: '/scheduled',
                        component: GrantScheduledPaymentList,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    },
                    {
                        name: 'master.app.administration.grant.create',
                        pattern: ':userId/create',
                        component: GrantCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.grant.edit',
                        pattern: ':userId/edit/:id',
                        component: GrantEdit,
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