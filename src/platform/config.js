import { moduleBuilder, moduleProviderFactory } from 'core/providers';
import { MainLayout } from 'core/layouts';
import { resolvePlatformUser } from 'core/utils';

(function () {
    moduleProviderFactory.platform.register({
        routes: [
            {
                name: 'master.platform',
                pattern: '/platform',
                beforeEnter: async (fromState, toState, routerStore) => {
                    const { rootStore } = routerStore;
                    rootStore.isPlatformUrl = true;
                    rootStore.platformStore.register();           
                    await rootStore.authStore.initialize();

                    return Promise.resolve();
                },
                children: [
                    {
                        name: 'master.platform.main',
                        pattern: '',
                        isPrivate: true,
                        beforeEnter: async (fromState, toState, routerStore) => {
                            await resolvePlatformUser(fromState, toState, routerStore);
                            
                            const menus = moduleBuilder.buildMenus(['common', 'application', 'platform']);
                            routerStore.rootStore.initializeMenus(menus, toState);

                            return Promise.resolve();
                        },
                        component: [MainLayout]
                    }
                ]
            }
        ]
    });
}());