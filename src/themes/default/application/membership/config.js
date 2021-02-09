import { moduleProviderFactory } from 'core/providers';
import { PublicLayout } from 'core/layouts';
import {
	Login,
	PasswordChange,
	PasswordRecovery,
	RegistrationSuccess,
	ActivationConfirm,
	FirstLoginExistingDonor,
} from 'application/common/membership/pages';

(function() {
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
						beforeEnter: async (fromState, toState, routerStore) => {
							if (routerStore.rootStore.authStore.isAuthenticated) {
								await routerStore.rootStore.userStore.resolveUser();
								return Promise.reject(routerStore.rootStore.getDashboard());
							}

							return Promise.resolve();
						},
					},
					{
						name: 'master.public.membership.registration-success',
						pattern: '/registration-success',
						isPublic: true,
						component: RegistrationSuccess,
					},
					{
						name: 'master.public.membership.activation-confirm',
						pattern: '/account-activation',
						isPublic: true,
						component: ActivationConfirm,
					},
					{
						name: 'master.public.membership.password-recovery',
						pattern: '/password-recovery',
						isPublic: true,
						component: PasswordRecovery,
					},
					{
						name: 'master.public.membership.password-change',
						pattern: '/password-change',
						isPublic: true,
						component: PasswordChange,
					},
					{
						name: 'master.public.membership.first-login',
						pattern: '/first-login',
						isPublic: true,
						component: FirstLoginExistingDonor,
					},
				],
			},
		],
	});
})();
