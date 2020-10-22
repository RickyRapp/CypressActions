import { moduleProviderFactory } from 'core/providers';
import { DonationReview } from 'application/donation/pages';
import { DonationModuleStore } from 'application/donation/stores';

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
                        component: DonationReview,
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
                order: 6,
                route: 'master.app.main.donation.list'
            }
        ],
        moduleStore: function (context) {
            return {
                'application.donation': new DonationModuleStore(context.rootStore),
            };
        },
    });
})();
