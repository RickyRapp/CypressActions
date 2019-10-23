import { moduleProviderFactory } from 'core/providers';
import { DonationList } from 'application/donation/pages';

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
                        component: DonationList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.DONATIONS',
                        order: 1,
                        route: 'master.app.main.donation.list'
                    }
                ]
            }
        ]
    });
})();
