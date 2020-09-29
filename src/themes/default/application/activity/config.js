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
                        role: ['Users'],
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity.deposits',
                        pattern: '/deposits',
                        component: ActivityTab,
                        role: ['Users'],
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST.DONOR"
                        }
                    },
                    {
                        name: 'master.app.main.activity.grants',
                        pattern: '/grants',
                        component: ActivityTab,
                        role: ['Users'],
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
                role: ['Users'],
                icon: 'activity'
            }
        ]
    });
})();
