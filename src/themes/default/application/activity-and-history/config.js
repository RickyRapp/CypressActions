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
                        pattern: '/overview/:id',
                        component: DonorActivityAndHistoryList,
                        authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
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
                        pattern: '/overview/:id',
                        component: CharityActivityAndHistoryList,
                        authorization: (route, rootStore) => { return rootStore.userStore.user.roles.includes('Charities') },
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
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity-and-history.admin-charity-view',
                        pattern: '/charity',
                        component: CharityActivityAndHistoryList,
                        authorization: 'theDonorsFundAdministrationSection.read',
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
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 2,
                icon: 'activity',
                subMenu: [
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.ADMINISTRATOR_DONOR_VIEW',
                        order: 1,
                        route: 'master.app.main.activity-and-history.admin-donor-view'
                    },
                    {
                        title: 'MENU.ACTIVITY_AND_HISTORY.ADMINISTRATOR_CHARITY_VIEW',
                        order: 2,
                        route: 'master.app.main.activity-and-history.admin-charity-view'
                    }
                ]
            },
            {
                title: 'MENU.ACTIVITY_AND_HISTORY.DONOR_VIEW',
                order: 1,
                route: 'master.app.main.activity-and-history.donor-view',
                authorization: (route, rootStore) => { return rootStore.userStore.user.roles.includes('Users') },
                icon: 'activity'
            },
            {
                title: 'MENU.ACTIVITY_AND_HISTORY.CHARITY_VIEW',
                order: 1,
                route: 'master.app.main.activity-and-history.charity-view',
                authorization: (route, rootStore) => { return rootStore.userStore.user.roles.includes('Charities') },
                icon: 'activity'
            }
        ]
    });
})();
