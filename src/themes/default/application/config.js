import { moduleProviderFactory } from 'core/providers';
import { MainLayout, MasterLayout, PublicLayout } from 'core/layouts';
import { LookupModuleStore } from 'application/common/lookup/stores';
import { SessionCreate } from 'application/administration/session/pages';
import { NotFound, Unauthorized, DisplayError } from 'common/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main',
                pattern: '',
                component: [MainLayout]
            },
            {
                name: 'master.app.not-found',
                pattern: '/not-found',
                component: NotFound,
            },
            {
                name: 'master.app.unauthorized',
                pattern: '/unauthorized',
                component: Unauthorized,
            },
            {
                name: 'master.app.error',
                pattern: '/error',
                component: [MasterLayout, DisplayError],
                beforeEnter: async (fromState, toState, routerStore) => {
                    // route to dashboard if initial route is error
                    if (routerStore.isInitial() && toState.params.type !== 'router') {
                        return Promise.reject(routerStore.rootStore.navigateDashboard());
                    }
                    // don't write any more code here because errors inside this block
                    // might cause circular loop
                    // Any unhandled error navigates to route 'error' -> beforeEnter -> Error -> navigate to 'error' ....
                    routerStore.rootStore.appStore.setInitialized();
                },
            },
            {
                name: 'master.app.session',
                pattern: '/new-session',
                component: [PublicLayout, SessionCreate],
                role: ['Administrators', 'Scanners']
            },
        ],
        moduleStore: function (context) {
            return { 'application.lookup': new LookupModuleStore(context.rootStore) };
        },
    });
})();
