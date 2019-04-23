import { moduleProviderFactory } from 'core/providers';
import { DonorAccountEdit } from 'modules/main/donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.account',
                pattern: '/profile',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.donor.account.edit',
                        pattern: '',
                        component: DonorAccountEdit,
                        authorization: 'theDonorsFundDonorSection.update',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read',
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
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