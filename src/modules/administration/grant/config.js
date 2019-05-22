import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantCreate } from 'modules/administration/grant/pages'

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
                        name: 'master.app.administration.grant.create',
                        pattern: ':userId/create',
                        component: GrantCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
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
                    }
                ]
            }
        ]
    })
})();