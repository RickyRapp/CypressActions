import { moduleProviderFactory } from 'core/providers';
import { DonorAccountAdministrationList, DonorAccountAdministrationEdit, DonorAccountMainEdit, DonorAccountAdministrationCreate } from 'modules/donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.donor.account',
                pattern: '/donor-account',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.donor.account.list',
                        pattern: '',
                        component: DonorAccountAdministrationList,
                    },
                    {
                        name: 'master.app.administration.donor.account.edit',
                        pattern: 'edit/:userId',
                        component: DonorAccountAdministrationEdit,
                    },
                    {
                        name: 'master.app.administration.donor.account.create',
                        pattern: 'create',
                        component: DonorAccountAdministrationCreate,
                    }
                ]
            },
            {
                name: 'master.app.main.donor.account',
                pattern: '/profile',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.donor.account.edit',
                        pattern: '',
                        component: DonorAccountMainEdit,
                        authorization: 'theDonorsFundDonorSection.update'
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
                        route: 'master.app.administration.donor.account.list',
                        order: 3
                    },
                    {
                        title: 'Profile',
                        route: 'master.app.main.donor.account.edit',
                        order: 3
                    }
                ]
            }
        ]
    })
})();