import { moduleProviderFactory } from 'core/providers';
import { Dashboard, AdminDashboard, CharityDashboard } from 'application/dashboard/pages';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.dashboard',
                pattern: '',
                authorization: '',
                component: Dashboard,
                beforeEnter: async (fromState, toState, routerStore) => {
                    if (routerStore.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) { //TODO: refactor this
                        return Promise.reject(new RouterState('master.app.main.admin-dashboard'));
                    }
                    else if (routerStore.rootStore.permissionStore.hasPermission('theDonorsFundCharitySection.read')) { //TODO: refactor this
                        return Promise.reject(new RouterState('master.app.main.charity-dashboard'));
                    }
                    return Promise.resolve();
                }
            },
            {
                name: 'master.app.main.charity-dashboard',
                pattern: '',
                authorization: '',
                component: CharityDashboard,
                beforeEnter: async (fromState, toState, routerStore) => {
                    if (routerStore.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) { //TODO: refactor this
                        return Promise.reject(new RouterState('master.app.main.admin-dashboard'));
                    }
                    return Promise.resolve();
                }
            },
            {
                name: 'master.app.main.admin-dashboard',
                pattern: '',
                authorization: 'theDonorsFundAdministrationSection.read',
                component: AdminDashboard
            }
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                icon: 'dashboard',
                order: 1,
                route: 'master.app.main.dashboard'
            },
            {
                title: 'MENU.ACTIVITY',
                icon: 'activity',
                order: 2,
                route: 'master.app.main.activity.all',
                role: ['Users']
            },
            {
                title: 'MENU.CONTRIBUTIONS',
                icon: 'contribution',
                order: 3,
                route: 'master.app.main.contribution.create',
                role: ['Users']
            },
            {
                title: 'MENU.NEW_GRANT',
                icon: 'grant',
                order: 4,
                role: ['Users'],
                route: 'master.app.main.grant.create',
            },
            {
                title: 'MENU.PROFILE_SETTING',
                icon: 'profile',
                order: 5,
                role: ['Users'],
                route: 'master.app.main.donor-profile'
            },
            {
                title: 'MENU.ORDER_VOUCHERS',
                icon: 'booklet-order',
                order: 6,
                role: ['Users'],
                route: 'master.app.main.booklet-order.create'
            },
            {
                title: 'MENU.CHARITY_PROFILE_SETTING',
                icon: 'profile',
                order: 2,
                role: ['Charities'],
                route: 'master.app.main.charity-profile'
            },
            {
                title: 'MENU.GRANT_REQUEST',
                icon: 'grant-request',
                order: 3,
                role: ['Charities'],
                route: 'master.app.main.grant.request'
            },
        ]
    });
})();
