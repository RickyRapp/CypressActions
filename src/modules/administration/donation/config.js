import { moduleProviderFactory } from 'core/providers';
import { DonationList } from 'modules/administration/donation/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.donation',
                pattern: '/donation',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.donation.list',
                        pattern: '',
                        component: DonationList,
                        authorization: 'theDonorsFundAdministrationSection.read'
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
                        route: 'master.app.administration.donation.list',
                        order: 7
                    }
                ]
            }
        ]
    })
})();