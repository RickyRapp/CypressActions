import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { MainLayout, MasterLayout } from 'core/layouts';
import { LookupModuleStore } from 'application/common/lookup/stores';
import { NotFound, Unauthorized, DisplayError } from 'common/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main',
                pattern: '',
                component: [MainLayout],
                beforeEnter: async (fromState, toState, routerStore) => {
                    const { rootStore } = routerStore;
                    await rootStore.userStore.resolveUser();
                    const menu = moduleBuilder.buildMenus(rootStore.configuration.menus, { rootStore: rootStore });
                    rootStore.menuStore.setMenu(menu, toState);
                },
                children: [
                    {
                        name: 'master.app.main.not-found',
                        pattern: '/not-found',
                        component: NotFound,
                    },
                    {
                        name: 'master.app.main.unauthorized',
                        pattern: '/unauthorized',
                        component: Unauthorized,
                    },
                    {
                        name: 'master.app.main.error',
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
            },
        ],
        moduleStore: function (context) {
            return { 'application.lookup': new LookupModuleStore(context.rootStore) };
        },
    });
})();
