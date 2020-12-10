import { moduleProviderFactory } from 'core/providers';
import { PublicLayout, MainLayout } from 'core/layouts';
import {
	Login,
	PasswordChange,
	PasswordRecovery,
	UserPreferences,
	RegistrationSuccess,
	ActivationConfirm
} from 'application/common/membership/pages';

(function () {
	moduleProviderFactory.application.register({
		routes: [
			{
				name: 'master.public.membership',
				pattern: '',
				component: [PublicLayout],
				children: [
					{
						name: 'master.public.membership.login',
						pattern: '/login',
						isPublic: true,
						component: Login,
						beforeEnter: function (fromState, toState, routerStore) {
							if (routerStore.rootStore.authStore.isAuthenticated) {
								return Promise.reject(routerStore.rootStore.initialState);
							}

							return Promise.resolve();
						}
					},
					{
						name: 'master.public.membership.registration-success',
						pattern: '/registration-success',
						isPublic: true,
						component: RegistrationSuccess
					},
					{
						name: 'master.public.membership.activation-confirm',
						pattern: '/account-activation',
						isPublic: true,
						component: ActivationConfirm
					},
					{
						name: 'master.public.membership.password-recovery',
						pattern: '/password-recovery',
						isPublic: true,
						component: PasswordRecovery
					},
					{
						name: 'master.public.membership.password-change',
						pattern: '/password-change',
						isPublic: true,
						component: PasswordChange
					}
				]
			},
			{
				name: 'master.app.main.donor.user-preferences',
				pattern: '/user-preferences',
				component: [MainLayout, UserPreferences],
			}
		]
	});
})();
