import { moduleBuilder, moduleProviderFactory } from 'core/providers';
import { MainLayout, PublicLayout } from 'core/layouts';
import { Overview } from 'modules/root/pages';
import { resolveApplicationUser } from 'core/utils';
import { Home } from 'modules/public/pages'

(function () {
  moduleProviderFactory.application.register({
    routes: context => [
      {
        name: 'master.app',
        pattern: '/app',
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
            name: 'master.app.administration',
            pattern: '/administration',
            component: [MainLayout],
            isPrivate: true,
            roles: 'administrators,employees',
            isParentLoginRoute: true,
            beforeEnter: async (fromState, toState, routerStore) => {
              await resolveApplicationUser(routerStore);

              let modules = ['common', 'application'];
              const menus = moduleBuilder.buildMenus(modules);
              routerStore.rootStore.initializeMenus(menus, toState);
            }
          },
          {
            name: 'master.app.main',
            pattern: '',
            component: [MainLayout],
            isPrivate: true,
            roles: 'users',
            isParentLoginRoute: true,
            beforeEnter: async (fromState, toState, routerStore) => {
              await resolveApplicationUser(routerStore);

              let modules = ['common', 'application'];
              const menus = moduleBuilder.buildMenus(modules);
              routerStore.rootStore.initializeMenus(menus, toState);
            }
          },
          {
            name: 'master.app.home',
            pattern: '',
            component: [MainLayout],
            isPrivate: true,
            roles: 'administrators,employees,users',
            isParentLoginRoute: true,
            beforeEnter: async (fromState, toState, routerStore) => {
              await resolveApplicationUser(routerStore);

              let modules = ['common', 'application'];
              const menus = moduleBuilder.buildMenus(modules);
              routerStore.rootStore.initializeMenus(menus, toState);
            }
          }
        ]
      },
      {
        name: 'master.public',
        pattern: '',
        component: [PublicLayout],
        isPrivate: false,
        children: [
          {
            name: 'master.public.home',
            pattern: '',
            component: Home
          }
        ]
      }
    ]
  });
})();
