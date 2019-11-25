import { moduleProviderFactory } from 'core/providers';
import { GroupedDonationList, DonationOverview } from 'application/donation/pages';
import { LookupService } from 'common/services';

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
                        },
                        beforeEnter: async function (fromState, toState, routerStore) {
                            const service = new LookupService(routerStore.rootStore.application.baasic.apiClient, 'donation-status');
                            const response = await service.getAll();
                            const pendingId = _.find(response.data, { abrv: 'pending' }).id
                            if (toState.queryParams) {
                                toState.queryParams.donationStatusIds = [pendingId]
                            }
                            else {
                                toState.queryParams = {
                                    donationStatusIds: [pendingId]
                                }
                            }
                            return Promise.resolve();
                        }
                    },
                    {
                        name: 'master.app.main.donation.overview',
                        pattern: 'overview',
                        component: DonationOverview,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONATION.LIST.OVERVIEW_TITLE"
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
                route: 'master.app.main.donation.list',
                icon: 'donations'
            }
        ]
    });
})();
