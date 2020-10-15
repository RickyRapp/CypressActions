import { moduleProviderFactory, moduleBuilder } from 'core/providers';
import { MainLayout, PublicLayout } from 'core/layouts';
import { LookupModuleStore } from 'application/lookup/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.public',
                pattern: '',
                children: [
                    {
                        name: 'master.public.main',
                        pattern: '',
                        isPublic: true,
                        component: [PublicLayout],
                        beforeEnter:
                            // eslint-disable-next-line
                            async (fromState, toState, routerStore) => {
                                await routerStore.rootStore.userStore.resolveUser();
                                return Promise.resolve();
                            },
                    }
                ]
            },
            {
                name: 'master.app',
                pattern: '/app',
                beforeEnter:
                    // eslint-disable-next-line
                    async (fromState, toState, routerStore) => {
                        await routerStore.rootStore.userStore.resolveUser();
                        const menu = moduleBuilder.buildMenus(routerStore.rootStore.configuration.menus, { rootStore: routerStore.rootStore });
                        routerStore.rootStore.menuStore.setMenu(menu, toState);

                        return Promise.resolve();
                    },
                children: [
                    {
                        name: 'master.app.main',
                        pattern: '',
                        component: [MainLayout]
                    }
                ]
            }
        ],
        moduleStore: function (context) {
            return { 'application.lookup': new LookupModuleStore(context.rootStore) };
        },
    });
}());
