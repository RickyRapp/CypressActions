import { moduleBuilder, moduleProviderFactory } from 'core/providers';
import { MainLayout } from 'core/layouts';
import { Home } from 'modules/root/pages';
import { resolveApplicationUser } from 'core/utils';

(function() {
  moduleProviderFactory.application.register({
    routes: context => [
      {
        name: 'master.app',
        pattern: '',
        beforeEnter: async (fromState, toState, routerStore) => {
          const { applicationStore, authStore } = routerStore.rootStore;
          applicationStore.register(ApplicationSettings.appId);

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
})();
