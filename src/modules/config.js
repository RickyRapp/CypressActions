import { moduleBuilder, moduleProviderFactory } from 'core/providers';
import { MainLayout, PublicLayout, ScanLayout } from 'core/layouts';
import { resolveApplicationUser } from 'core/utils';
import { Home } from 'modules/common/public/pages'
import { ActivationConfirm } from 'modules/administration/membership/pages';

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

          await resolveApplicationUser(routerStore);

          let modules = ['common', 'application'];
          const menus = moduleBuilder.buildMenus(modules);
          routerStore.rootStore.initializeMenus(menus, toState);
        },
        children: [
          {
            name: 'master.app.administration',
            pattern: '/administration',
            isPrivate: true,
            component: [MainLayout],

          },
          {
            name: 'master.app.main',
            pattern: '',
            isPrivate: true,
            component: [MainLayout],

          },
          {
            name: 'master.app.scanner',
            pattern: '/scanning',
            isPrivate: true,
            component: [ScanLayout],

          }
        ]
      },
      {
        name: 'master.public',
        pattern: '',
        component: [PublicLayout],
        isPrivate: false,
        beforeEnter: async (fromState, toState, routerStore) => {
          const { applicationStore, authStore } = routerStore.rootStore;
          applicationStore.register(ApplicationSettings.appId);

          try {
            await authStore.initialize();
          } catch (ex) {
            return Promise.reject(ex);
          }

          if (routerStore.rootStore.authStore.isAuthenticated) {
            await resolveApplicationUser(routerStore);
          }
        },
        children: [
          {
            name: 'master.public.home',
            pattern: '',
            component: Home
          },
          {
            name: 'master.public.membership.activation-confirm',
            pattern: '/account-activation',
            component: ActivationConfirm
          },
        ]
      },
      // {
      //   name: 'master.session',
      //   pattern: '/session',
      //   component: [ScanLayout],
      //   beforeEnter: async (fromState, toState, routerStore) => {
      //     const { applicationStore, authStore } = routerStore.rootStore;
      //     applicationStore.register(ApplicationSettings.appId);

      //     try {
      //       await authStore.initialize();

      //     } catch (ex) {
      //       return Promise.reject(ex);
      //     }

      //     await resolveApplicationUser(routerStore);
      //   }
      // },
    ]
  });
})();
