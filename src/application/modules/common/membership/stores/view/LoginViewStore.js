import { action } from 'mobx';
import { LoginForm } from 'application/common/membership/forms';
import { BaseViewStore } from 'core/stores';
import { RouterState } from 'mobx-state-router';

class LoginViewStore extends BaseViewStore {
    routes = {
        forgotPassword: () => this.rootStore.routerStore.goTo('master.app.membership.password-recovery'),
        register: () => this.rootStore.routerStore.goTo('master.app.main.donor.register')
    };

    loaderStore = this.createLoaderStore();
    loginForm = new LoginForm({
        onSuccess: async (form) => {
            const { email, password } = form.values();
            await this.login({
                username: email,
                password
            });
        },
    });

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;
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
            }
            else {
                const { data: { roles: roles } } = await this.app.membershipModule.login.loadUserData({ embed: 'permissions' });
                if (roles.includes('Charities')) {
                    this.rootStore.setInitialState(new RouterState('master.app.main.charity.dashboard'));
                }
                else if (roles.includes(['Administrators', 'Employees'])) {
                    this.rootStore.setInitialState(new RouterState('master.app.main.admin.dashboard'));
                }
                await this.rootStore.routerStore.goTo(this.rootStore.initialState);
            }
        } catch (ex) {
            const { statusCode, data } = ex;
            if (statusCode === 400) {
                if (data.error === 'invalid_grant') {
                    this.loginForm.invalidate('Invalid username or password');
                }
                else if (data.error === 'invalid_grant_lock') {
                    this.loginForm.invalidate('User is locked');
                }
                else if (data.error === 'invalid_grant_approve') {
                    this.loginForm.invalidate('User is not approved');
                }
            }
        }
        this.loaderStore.resume();
    }
}

export default LoginViewStore;
