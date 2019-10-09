import { moduleProviderFactory } from 'core/providers';
import { PublicLayout, MainLayout } from 'core/layouts';
import {
	Login,
	Register,
	PasswordChange,
	PasswordRecovery,
	UserPreferences,
	RegistrationSuccess,
	ActivationConfirm
} from 'application/membership/pages';

(function () {
	moduleProviderFactory.application.register({
		name: 'Baasic.App.Membership',
		routes: [
			{
				name: 'master.app.membership',
				pattern: '',
				component: [PublicLayout],
				children: [
					{
						name: 'master.app.membership.login',
						pattern: '/login',
						isPublic: true,
						component: Login,
						beforeEnter: function (fromState, toState, routerStore) {
							if (routerStore.rootStore.authStore.isAuthenticated) {
								if (fromState.routeName === '__initial__') {
									return Promise.reject(routerStore.rootStore.initialState);
								} else {
									return Promise.reject(fromState);
								}
							}

							return Promise.resolve();
						}
					},
					{
						name: 'master.app.membership.register',
						pattern: '/register',
						isPublic: true,
						component: Register
					},
					{
						name: 'master.app.membership.registration-success',
						pattern: 'registration-success',
						isPublic: true,
						component: RegistrationSuccess
					},
					{
						name: 'master.app.membership.activation-confirm',
						pattern: '/account-activation',
						isPublic: true,
						component: ActivationConfirm
					},
					{
						name: 'master.app.membership.password-recovery',
						pattern: '/password-recovery',
						isPublic: true,
						component: PasswordRecovery
					},
					{
						name: 'master.app.membership.password-change',
						pattern: '/password-change',
						isPublic: true,
						component: PasswordChange
					}
				]
			},
			{
				name: 'master.app.main.user-preferences',
				pattern: '/user-preferences',
				component: [MainLayout, UserPreferences],
			}
		]
	});
})();
