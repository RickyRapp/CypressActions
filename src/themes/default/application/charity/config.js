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
            },{
                title: 'MENU.WITHDRAW',
                icon: 'give',
                order: 3,
                route: 'master.app.main.charity.withdraw',
                role: ['Charities']
            },
            {
                title: 'MENU.GRANT_REQUEST',
                icon: 'grant',
                order: 4,
                route: 'master.app.main.charity.grant-request.create',
                role: ['Charities']
            },
            {
                title: 'MENU.REMOTE_DEPOSIT',
                icon: 'contribution',
                order: 5,
                route: 'master.app.main.charity.remote-deposit.list',
                role: ['Charities']
            },
            {
                title: 'MENU.CHARITY_GIVING_CARD',
                icon: 'fidelity-cards',
                order: 6,
                route: 'master.app.main.charity.giving-card.create',
                role: ['Charities']
            },
            {
                title: 'MENU.APIS_AND_PAYMENTS',
                icon: 'third-party-website',
                order: 7,
                route: 'master.app.main.charity.dashboard',
                role: ['Charities']
            },
            {
                title: 'MENU.INVEST_FUNDS',
                icon: 'grant',
                order: 8,
                route: 'master.app.main.charity.dashboard',
                role: ['Charities']
            },
            {
                title: 'MENU.ACCEPT_STOCKS_AND_SECURITIES',
                icon: 'banks',
                order: 9,
                route: 'master.app.main.charity.accept-security.create',
                role: ['Charities']
            },
            {
                title: 'MENU.MANAGE_ACCOUNT',
                icon: 'profile',
                order: 10,
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
