import { moduleProviderFactory } from 'core/providers';
import { GrantDonorAccountList, GrantDonorAccountCreate, GrantDonorAccountEdit, } from 'modules/main/grant-donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.grant-donor-account',
                pattern: '/grant-donor-account',
                children: [
                    {
                        name: 'master.app.main.grant-donor-account.create',
                        pattern: 'create',
                        component: GrantDonorAccountCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.grant-donor-account.edit',
                        pattern: 'edit/:id',
                        component: GrantDonorAccountEdit,
                        authorization: 'theDonorsFundGrantSection.update',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.grant-donor-account.list',
                        pattern: '',
                        component: GrantDonorAccountList,
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
                        title: 'Grants',
                        route: 'master.app.main.grant-donor-account.list',
                        order: 7
                    }
                ]
            }
        ]
    })
})();