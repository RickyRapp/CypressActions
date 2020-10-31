import { moduleProviderFactory } from 'core/providers';
import { MasterLayout } from 'core/layouts';
import { NotFound, DisplayError, Unauthorized } from 'common/pages';

(function () {
    moduleProviderFactory.common.register({
        routes: [
            {
                name: 'master',
                pattern: '/app',
                component: [MasterLayout],
                children: [
                    {
                        name: 'master.not-found',
                        pattern: '/not-found',
                        isPublic: true,
                        component: NotFound,
                    },
                    {
                        name: 'unauthorized',
                        pattern: '/unauthorized',
                        isPublic: true,
                        component: Unauthorized,
                    },
                ],
            },
            {
                name: 'error',
                pattern: '/error',
                component: [MasterLayout, DisplayError],
                beforeEnter: async (fromState, toState, routerStore) => {
                    // route to dashboard if initial route is error
                    if (routerStore.isInitial() && toState.params.type !== 'router') {
                        return Promise.reject(routerStore.rootStore.initialState);
                    }
                    // don't write any more code here because errors inside this block
                    // might cause circular loop
                    // Any unhandled error navigates to route 'error' -> beforeEnter -> Error -> navigate to 'error' ....
                    routerStore.rootStore.appStore.setInitialized();
                },
            },
        ],
    });
})();
