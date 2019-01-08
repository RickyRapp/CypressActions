import { moduleBuilder, moduleProviderFactory } from 'core/providers';
import { MainLayout } from 'core/layouts';
import { Home } from 'modules/root/pages';
import { resolveApplicationUser } from 'core/utils';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: (context) => [
            {
                name: 'master.app',
                pattern: context.rootStore.isMultiTenancy ? '/apps/:appId' : '',
                beforeEnter: async (fromState, toState, routerStore) => {
                    const {
                        applicationStore,
                        platformStore,
                        authStore                        
                    } = routerStore.rootStore;

                    routerStore.rootStore.isPlatformUrl = false;

                    if (context.rootStore.isMultiTenancy) {
                        const appIdentifier = toState.params.appId;
                        if (!appIdentifier) {
                            return Promise.reject(new RouterState('master.platform.main.user.list'));
                        }

                        applicationStore.register(toState.params.appId);
                        platformStore.register();
                    } else {
                        applicationStore.register(ApplicationSettings.appId);
                    }

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
                        isPrivate: true,
                        beforeEnter: async (fromState, toState, routerStore) => {
                            await resolveApplicationUser(fromState, toState, routerStore);

                            let modules = ['common', 'application'];
                            if (routerStore.rootStore.isMultiTenancy) {
                                modules.push('platform');
                            }
                            const menus = moduleBuilder.buildMenus(modules);
                            routerStore.rootStore.initializeMenus(menus, toState);
                        },
                        children: [
                            {
                                name: 'master.app.main.home',
                                pattern: '',
                                component: Home
                            }
                        ]
                    }
                ]
            }
        ]
    });
}());