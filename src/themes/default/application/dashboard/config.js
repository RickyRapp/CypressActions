import { moduleProviderFactory } from 'core/providers';
import { Dashboard, AdminDashboard } from 'application/dashboard/pages';
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
                    return Promise.resolve();
                }
            },
            {
                name: 'master.app.main.admin-dashboard',
                pattern: '',
                authorization: '',
                component: AdminDashboard
            },
        ],
        menu: [
            {
                title: 'MENU.DASHBOARD',
                order: 2,
                route: 'master.app.main.dashboard',
                icon: 'dashboard'
            }
        ]
    });
})();
