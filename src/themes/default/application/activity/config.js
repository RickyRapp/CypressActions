import { moduleProviderFactory } from 'core/providers';
import { ActivityTab } from 'application/activity/pages';
import { ActivityModuleStore } from 'application/activity/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.activity',
                pattern: '/activity',
                children: [
                    {
                        name: 'master.app.main.activity.all',
                        pattern: '',
                        component: ActivityTab,
                        data: {
                            title: "ACTIVITY_AND_HISTORY.LIST"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ACTIVITY',
                order: 3,
                route: 'master.app.main.activity.all',
                role: ['Users']
            }
        ],
        moduleStore: function (context) {
            return {
                'application.activity': new ActivityModuleStore(context.rootStore)
            };
        },
    });
})();
