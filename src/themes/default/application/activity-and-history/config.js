import { moduleProviderFactory } from 'core/providers';
import { DonorActivityAndHistoryList, CharityActivityAndHistoryList } from 'application/activity-and-history/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.activity-and-history',
                pattern: '/activity-and-history',
                children: [
                    {
                        name: 'master.app.main.activity-and-history.donor-view',
                        pattern: '/donor/:id',
                        component: DonorActivityAndHistoryList,
                        authorization: 'theDonorsFundDonorSection.update',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        },
                        beforeEnter: function (fromState, toState, routerStore) {
                            toState.params.id = routerStore.rootStore.userStore.applicationUser.id
                            return Promise.resolve();
                        }
                    },
                    {
                        name: 'master.app.main.activity-and-history.charity-view',
                        pattern: '/charity/:id',
                        component: CharityActivityAndHistoryList,
                        authorization: 'theDonorsFundCharitySection.update',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.CHARITY"
                        },
                        beforeEnter: function (fromState, toState, routerStore) {
                            toState.params.id = routerStore.rootStore.userStore.applicationUser.id
                            return Promise.resolve();
                        }
                    },
                    {
                        name: 'master.app.main.activity-and-history.admin-donor-view',
                        pattern: '/donor',
                        component: DonorActivityAndHistoryList,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity-and-history.admin-charity-view',
                        pattern: '/charity',
                        component: CharityActivityAndHistoryList,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.CHARITY"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ACTIVITY_AND_HISTORY.TITLE',
                subMenu: [
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.ADMINISTRATOR_DONOR_VIEW',
                        order: 1,
                        route: 'master.app.main.activity-and-history.admin-donor-view',
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.ADMINISTRATOR_CHARITY_VIEW',
                        order: 2,
                        route: 'master.app.main.activity-and-history.admin-charity-view',
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.DONOR_VIEW',
                        order: 3,
                        route: 'master.app.main.activity-and-history.donor-view',
                        authorization: 'theDonorsFundDonorSection.read'
                    },
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.CHARITY_VIEW',
                        order: 4,
                        route: 'master.app.main.activity-and-history.charity-view',
                        authorization: 'theDonorsFundCharitySection.read'
                    }
                ]
            }
        ]
    });
})();
