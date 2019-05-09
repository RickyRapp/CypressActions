import { moduleProviderFactory } from 'core/providers';
import { DonorAccountList, DonorAccountOverview, DonorAccountCreate } from 'modules/administration/donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.donor-account',
                pattern: '/donor-account',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.donor-account.list',
                        pattern: '',
                        component: DonorAccountList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.donor-account.edit',
                        pattern: ':userId/edit',
                        component: DonorAccountOverview,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    },
                    {
                        name: 'master.app.administration.donor-account.create',
                        pattern: 'create',
                        component: DonorAccountCreate,
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
                        title: 'Donors',
                        route: 'master.app.administration.donor-account.list',
                        order: 3
                    }
                ]
            }
        ]
    })
})();