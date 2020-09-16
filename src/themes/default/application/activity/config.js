import { moduleProviderFactory } from 'core/providers';
import { ActivityTab } from 'application/activity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.activity',
                pattern: '/activity',
                children: [
                    {
                        name: 'master.app.main.activity.transactions',
                        pattern: '/transaction',
                        component: ActivityTab,
                        authorization: (route, rootStore) => { return rootStore.userStore.user && rootStore.userStore.user.roles.includes('Users'); },
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity.deposits',
                        pattern: '/deposits',
                        component: ActivityTab,
                        authorization: (route, rootStore) => { return rootStore.userStore.user && rootStore.userStore.user.roles.includes('Users'); },
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity.grants',
                        pattern: '/grants',
                        component: ActivityTab,
                        authorization: (route, rootStore) => { return rootStore.userStore.user && rootStore.userStore.user.roles.includes('Users'); },
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ACTIVITY',
                order: 3,
                route: 'master.app.main.activity.transactions',
                authorization: (route, rootStore) => { return rootStore.userStore.user && rootStore.userStore.user.roles.includes('Users') },
                icon: 'activity'
            }
        ]
    });
})();
