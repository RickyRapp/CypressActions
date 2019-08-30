import { moduleProviderFactory } from 'core/providers';
import { GrantScheduledPaymentList, GrantList, GrantCreate, GrantEdit } from 'modules/main/grant/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant',
                pattern: '/grant',
                children: [
                    {
                        name: 'master.app.main.grant.list',
                        pattern: '',
                        component: GrantList,
                        authorization: ['theDonorsFundGrantSection.read', 'theDonorsFundGrantSection.update'],
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.grant.create',
                        pattern: 'create',
                        component: GrantCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.grant.edit',
                        pattern: 'edit/:id',
                        component: GrantEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.grant.scheduled.list',
                        pattern: '/scheduled',
                        component: GrantScheduledPaymentList,
                        authorization: 'theDonorsFundGrantSection.update',
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
                        title: 'Grants',
                        route: 'master.app.main.grant.list',
                        order: 7
                    },
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