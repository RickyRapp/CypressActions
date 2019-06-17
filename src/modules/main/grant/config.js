import { moduleProviderFactory } from 'core/providers';
import { GrantList, GrantCreate, GrantEdit } from 'modules/main/grant/pages'

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
                        authorization: 'theDonorsFundGrantSection.read',
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
                    }
                ]
            }
        ]
    })
})();