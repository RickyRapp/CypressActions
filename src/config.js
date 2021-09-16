import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { MasterLayout } from 'core/layouts';
import { NotFound } from 'common/pages';

(function () {
    moduleProviderFactory.common.register({
        routes: [
            {
                name: 'master',
                pattern: '/app',
                component: [MasterLayout],
                children: [
                    {
                        name: 'master.app',
                        pattern: '',
                        isPublic: false,
                        hookCondition:
                            // eslint-disable-next-line
                            (fromState, toState, routerStore) => {
                                return fromState.params.applicationIdentifier !== toState.params.applicationIdentifier;
                            },
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                const { rootStore } = routerStore;

                                try {
                                    await rootStore.authStore.initialize();
                                } catch (ex) {
                                    return Promise.reject(ex);
                                }

                                await rootStore.userStore.resolveUser();
                                const menu = moduleBuilder.buildMenus(rootStore.configuration.menus, { rootStore: rootStore });
                                rootStore.menuStore.setMenu(menu, toState);

                                return Promise.resolve();
                            },
                    },
                    {
                        name: 'master.not-found',
                        pattern: '/not-found',
                        component: NotFound,
                    },
                ]
            },
        ],
    });
})();
