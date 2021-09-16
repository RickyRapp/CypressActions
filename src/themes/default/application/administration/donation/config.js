import { moduleProviderFactory } from 'core/providers';
import { PendingDonationList } from 'application/administration/donation/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.donation',
                pattern: '/donations',
                children: [
                    {
                        name: 'master.app.main.administration.donation.list',
                        pattern: '',
                        component: PendingDonationList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.REVIEW.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.DONATIONS',
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'donations',
                order: 6,
                route: 'master.app.main.donation.list'
            }
        ],
    });
})();
