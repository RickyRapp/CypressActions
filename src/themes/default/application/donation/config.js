import { moduleProviderFactory } from 'core/providers';
import { GroupedDonationList, DonationReview, CharityProcessedDonation } from 'application/donation/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donation',
                pattern: '/donations',
                children: [
                    {
                        name: 'master.app.main.donation.list',
                        pattern: '',
                        component: GroupedDonationList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.LIST.GROUPED_TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donation.review',
                        pattern: '/review/:id',
                        component: DonationReview,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.LIST.OVERVIEW_TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donation.processed',
                        pattern: '/processed',
                        component: CharityProcessedDonation,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.LIST.CHARITY_PROCESSED"
                        }
                    },
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.DONATIONS',
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 6,
                route: 'master.app.main.donation.list',
                icon: 'donations'
            }
        ]
    });
})();
