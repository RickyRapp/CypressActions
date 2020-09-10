import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { MainLayout, PublicLayout } from 'core/layouts';

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
                        const {
                            applicationStore,
                            authStore
                        } = routerStore.rootStore;
                        applicationStore.register(ApplicationSettings); // eslint-disable-line

                        try {
                            await authStore.initialize();
                        } catch (ex) {
                            return Promise.reject(ex);
                        }

                        return Promise.resolve();
                    },
                children: [
                    {
                        name: 'master.app.public',
                        isPublic: true,
                        pattern: '/',
                        component: [PublicLayout]
                    },
                    {
                        name: 'master.app.main',
                        pattern: '/app',
                        component: [MainLayout],
                        beforeEnter: async (fromState, toState, routerStore) => {
                            const { rootStore } = routerStore;
                            await rootStore.userStore.resolveUser();
                            const menu = moduleBuilder.buildMenus(rootStore.configuration.menus, { rootStore: rootStore });
                            rootStore.menuStore.setMenu(menu, toState);
                        }
                    }
                ]
            }
        ]
    });
}());
