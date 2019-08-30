import { moduleProviderFactory } from 'core/providers';
import { DonationList } from 'modules/main/donation/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donation',
                pattern: '/donation',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.donation.list',
                        pattern: '',
                        component: DonationList,
                        authorization: 'theDonorsFundCharitySection.read',
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
                        title: 'Donations',
                        route: 'master.app.main.donation.list',
                        order: 7
                    }
                ]
            }
        ]
    })
})();