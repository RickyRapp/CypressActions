import { CharityModuleStore } from 'application/charity/module';
import { moduleProviderFactory } from 'core/providers'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity',
                pattern: '/charity',
                role: ['Charities']
            },
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                icon: 'dashboard',
                order: 1,
                role: ['Charities'],
                route: 'master.app.main.charity.dashboard'
            },
            {
                title: 'MENU.ACTIVITY',
                icon: 'activity',
                order: 2,
                route: 'master.app.main.charity.activity',
                role: ['Charities']
            },
            {
                title: 'MENU.GRANT_REQUEST',
                icon: 'grant',
                order: 3,
                route: 'master.app.main.charity.grant-request.create',
                role: ['Charities']
            },
            {
                title: 'MENU.PROFILE',
                icon: 'profile',
                order: 4,
                route: 'master.app.main.charity.profile',
                role: ['Charities']
            },
        ],
        moduleStore: function (context) {
            return {
                'application.charity': new CharityModuleStore(context.rootStore),
            };
        },
    });
})();
