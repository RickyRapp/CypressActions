import { moduleProviderFactory } from 'core/providers';
import { MembershipModuleStore } from 'modules/administration/membership/stores';
import { PublicLayout, MainLayout } from 'core/layouts';
import {
  Login,
  RegisterPublic,
  RegistrationSuccess,
  PasswordChange,
  PasswordRecovery,
  Unauthorized,
  UserPreferences
} from 'modules/administration/membership/pages';

(function () {
  moduleProviderFactory.application.register({
    name: 'Baasic.Membership',
    routes: [
      {
        name: 'master.public.membership',
        pattern: '',
        children: [
          {
            name: 'master.public.membership.login',
            pattern: '/login',
            component: Login,
            beforeEnter: function (fromState, toState, routerStore) {
              if (routerStore.rootStore.authStore.isAuthenticated) {
                // if user is already logged in and tries to navigate to login page, navigate to initial state
                return Promise.reject(routerStore.rootStore.initialState);
              }

              return Promise.resolve();
            }
          },
          {
            name: 'master.public.membership.register.public',
            pattern: '/register',
            component: RegisterPublic,
            beforeEnter: function (fromState, toState, routerStore) {
              if (routerStore.rootStore.authStore.isAuthenticated) {
                // if user is already logged in and tries to navigate to register page, navigate to initial state
                return Promise.reject(routerStore.rootStore.initialState);
              }

              return Promise.resolve();
            }
          },
          {
            name: 'master.public.membership.password-recovery',
            pattern: '/password-recovery',
            component: PasswordRecovery
          },
          {
            name: 'master.public.membership.password-change',
            pattern: '/password-change',
            component: PasswordChange
          }
        ]
      },
      {
        name: 'master.app.administration.membership.user-preferences',
        pattern: '/user-preferences',
        component: [MainLayout, UserPreferences],
        isPrivate: true
      },
      {
        name: 'master.app.administration.membership.registration-success',
        pattern: '/registration-success',
        component: RegistrationSuccess
      },
      {
        name: 'unauthorized',
        pattern: '/unauthorized',
        component: Unauthorized
      }
    ],
    storeFactory: function (context) {
      return {
        'app.membership': new MembershipModuleStore(context.rootStore)
      };
    }
  });
})();
