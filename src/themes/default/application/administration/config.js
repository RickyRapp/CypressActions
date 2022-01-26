import { AdministrationModuleStore } from 'application/administration/module';
import { moduleProviderFactory } from 'core/providers';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration',
                pattern: '/administration',
                role: ['Administrators', 'Employees'],
            },
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                icon: 'dashboard',
                order: 1,
                route: 'master.app.main.administration.dashboard',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.DONORS',
                icon: 'donors',
                order: 2,
                route: 'master.app.main.administration.donor.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.CHARITIES',
                icon: 'charities',
                order: 3,
                route: 'master.app.main.administration.charity.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.DEPOSIT',
                icon: 'contribution',
                order: 4,
                route: 'master.app.main.administration.contribution.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.GRANT',
                icon: 'grant',
                order: 5,
                route: 'master.app.main.administration.grant.tab',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.BOOKLET_ORDERS',
                icon: 'booklet-order',
                order: 6,
                route: 'master.app.main.administration.booklet-order.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.BOOKLET',
                icon: 'booklet',
                order: 7,
                route: 'master.app.main.administration.booklet.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.SESSION',
                icon: 'sessions',
                order: 8,
                route: 'master.app.main.administration.session.tab',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.USERS',
                icon: 'users',
                order: 9,
                route: 'master.app.main.administration.user.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.GIVING_CARDS',
                icon: 'fidelity-cards',
                order: 10,
                route: 'master.app.main.administration.giving-card.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.CHARITY_WEBSITE',
                icon: 'third-party-website',
                order: 11,
                route: 'master.app.main.administration.charity-website.tab',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.BANKS',
                icon: 'banks',
                order: 12,
                route: 'master.app.main.administration.bank.tab',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.DONATIONS',
                icon: 'donations',
                order: 13,
                route: 'master.app.main.administration.donation.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.RECONCILE',
                icon: 'reconcile',
                order: 14,
                route: 'master.app.main.administration.reconcile.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.TESTING',
                icon: 'test',
                order: 15,
                route: 'master.app.main.administration.test.tab',
                role: ['Administrators']
            },
            {
                title: 'MENU.INVESTMENTS',
                icon: 'investment',
                order: 16,
                route: 'master.app.main.administration.investment.list',
                role: ['Administrators']
            },
            {
                title: 'MENU.CREDIT_DEBIT',
                icon: 'contribution',
                order: 17,
                route: 'master.app.main.administration.credit-debit.list',
				role: ['Administrators']
			},
            {
                title: 'MENU.DONOR-DONOR',
                icon: 'donor-to-donor',
                order: 18,
                route: 'master.app.main.administration.donor-donor.list',
                role: ['Administrators']
            }
        ],
        moduleStore: function (context) {
            return {
                'application.administration': new AdministrationModuleStore(context.rootStore),
            };
        },
    });
})();
