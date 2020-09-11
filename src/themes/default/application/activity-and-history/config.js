import { moduleProviderFactory } from 'core/providers';
import { DonorActivityAndHistory, CharityActivityAndHistory, ActivityAndHistoryTab } from 'application/activity-and-history/pages';

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
                        component: DonorActivityAndHistory,
                        authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.applicationUser.roles.includes('Users'); },
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
                        pattern: '/my-history/:id',
                        component: CharityActivityAndHistory,
                        authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.some(c => ['CharitiesAdvanced', 'CharitiesRegular'].includes(c)) },
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.CHARITY"
                        },
                        beforeEnter: function (fromState, toState, routerStore) {
                            toState.params.id = routerStore.rootStore.userStore.applicationUser.id
                            return Promise.resolve();
                        }
                    },
                    {
                        name: 'master.app.main.activity-and-history.tab',
                        pattern: '/activity',
                        component: ActivityAndHistoryTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.TITLE"
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
                route: 'master.app.main.activity-and-history.tab'
            },
            {
                title: 'MENU.ACTIVITY_AND_HISTORY.DONOR_VIEW',
                order: 2,
                route: 'master.app.main.activity-and-history.donor-view',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.includes('Users') },
                icon: 'activity'
            },
            {
                title: 'MENU.ACTIVITY_AND_HISTORY.CHARITY_VIEW',
                order: 2,
                route: 'master.app.main.activity-and-history.charity-view',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.some(c => ['CharitiesAdvanced', 'CharitiesRegular'].includes(c)) },
                icon: 'activity'
            }
        ]
    });
})();
