import { action } from 'mobx';
import { LoginForm } from 'application/common/membership/forms';
import { BaseViewStore } from 'core/stores';
import { RouterState } from 'mobx-state-router';
import { BasicLookupsService } from 'application/common/lookup/basic-lookups/services';
class LoginViewStore extends BaseViewStore {
	routes = {
		forgotPassword: () => this.rootStore.routerStore.goTo('master.public.membership.password-recovery'),
	};

	loaderStore = this.createLoaderStore();
	loginForm = new LoginForm({
		onSuccess: async form => {
			const { email, password } = form.values();
			await this.login({
				username: email,
				password,
			});
		},
	});

	constructor(rootStore) {
		super();
		this.rootStore = rootStore;
		this.basicLookupsService = new BasicLookupsService(rootStore.application.baasic.apiClient);
		this.app = rootStore.application.baasic;
	}

	@action async login({ username, password }) {
		this.loaderStore.suspend();
		if (this.rootStore.authStore.isAuthenticated) {
			await this.rootStore.viewStore.logout();
		}
		try {
			await this.app.membershipModule.login.login({ username, password, options: ['sliding'] });
			const redirect = this.rootStore.authStore.getSignInRedirect();
			if (redirect) {
				await this.rootStore.routerStore.goTo(redirect);
			} else {
				const {
					data: { roles: roles },
				} = await this.app.membershipModule.login.loadUserData({ embed: 'permissions' });
				if (roles) {
					if(localStorage.getItem('apiVersion') !== null) {
						if(localStorage.getItem('apiVersion') !== ApplicationSettings.apiVersion) {
							localStorage.clear();
						}
					} else {
						localStorage.setItem('apiVersion', ApplicationSettings.apiVersion);
					}
					if (roles.includes('Users')) {
						this.rootStore.routerStore.goTo(new RouterState('master.app.main.donor.dashboard'));
					} else if (roles.includes('Charities')) {
						this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.dashboard'));
					} else if (roles.some(c => ['Administrators', 'Employees'].includes(c))) {
						this.rootStore.routerStore.goTo(new RouterState('master.app.main.administration.dashboard'));
					} else if (roles.includes('Scanners')) {
						this.rootStore.routerStore.goTo(new RouterState('master.app.session'));
					}
				} else {
					this.rootStore.routerStore.goTo(new RouterState('master.app.unauthorized'));
				}
			}
		} catch (ex) {
			const { statusCode, data } = ex;
			if (statusCode === 400) {
				if (data.error === 'invalid_grant') {
					this.loginForm.invalidate('Invalid username or password');
				} else if (data.error === 'invalid_grant_lock') {
					this.loginForm.invalidate('User is locked');
				} else if (data.error === 'invalid_grant_approve') {
					this.loginForm.invalidate('User is not approved');
				}
			}
		}
		this.loaderStore.resume();
	}
}

export default LoginViewStore;
