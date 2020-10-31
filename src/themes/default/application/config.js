import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { MainLayout } from 'core/layouts';
import { LookupModuleStore } from 'application/lookup/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app',
                pattern: '',
                hookCondition:
                    // eslint-disable-next-line
                    (fromState, toState, routerStore) => {
                        return fromState.params.applicationIdentifier !== toState.params.applicationIdentifier;
                    },
                beforeEnter:
                    // eslint-disable-next-line
                    async (fromState, toState, routerStore) => {
                        const { authStore } = routerStore.rootStore;

                        try {
                            await authStore.initialize();
                        } catch (ex) {
                            return Promise.reject(ex);
                        }

                        return Promise.resolve();
                    },
                children: [
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
                    },
                ],
            },
        ],
        moduleStore: function (context) {
            return { 'application.lookup': new LookupModuleStore(context.rootStore) };
        },
    });
})();
