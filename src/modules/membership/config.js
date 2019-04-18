import { RouterState } from 'mobx-state-router';
import { moduleProviderFactory } from 'core/providers';
import { MembershipModuleStore } from 'modules/membership/stores';
import { PublicLayout, MainLayout } from 'core/layouts';
import {
  Login,
  CreateDonorAccount,
  RegisterPublic,
  ActivationConfirm,
  RegistrationSuccess,
  PasswordChange,
  PasswordRecovery,
  Unauthorized,
  UserPreferences
} from 'modules/membership/pages';

(function () {
  moduleProviderFactory.application.register({
    name: 'Baasic.Membership',
    routes: [
      {
        name: 'master.app.membership',
        pattern: '',
        component: [PublicLayout],
        children: [
          {
            name: 'master.app.membership.login',
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
            name: 'master.app.membership.register.public',
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
            name: 'master.app.membership.password-recovery',
            pattern: '/password-recovery',
            component: PasswordRecovery
          },
          {
            name: 'master.app.membership.password-change',
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
        name: 'master.app.administration.membership.activation-confirm',
        pattern: '/account-activation',
        component: ActivationConfirm
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
