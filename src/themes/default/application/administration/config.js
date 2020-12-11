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
                title: 'MENU.DEPOSIT',
                icon: 'contribution',
                order: 3,
                route: 'master.app.main.administration.contribution.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.GRANT',
                icon: 'grant',
                order: 4,
                route: 'master.app.main.administration.grant.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.BOOKLET_ORDERS',
                icon: 'booklet-order',
                order: 5,
                route: 'master.app.main.administration.booklet-order.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.BOOKLET',
                icon: 'booklet',
                order: 6,
                route: 'master.app.main.administration.booklet.list',
                role: ['Administrators', 'Employees']
            },
            {
                title: 'MENU.SESSION',
                icon: 'sessions',
                order: 7,
                route: 'master.app.main.administration.session.tab',
                role: ['Administrators', 'Employees']
            }
        ],
        moduleStore: function (context) {
            return {
                'application.administration': new AdministrationModuleStore(context.rootStore),
            };
        },
    });
})();
