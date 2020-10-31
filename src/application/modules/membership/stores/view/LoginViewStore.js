import { action } from 'mobx';
import { LoginForm } from 'application/membership/forms';
import { BaseViewStore } from 'core/stores';

class LoginViewStore extends BaseViewStore {
    routes = {
        forgotPassword: () => this.rootStore.routerStore.goTo('master.app.membership.password-recovery'),
        register: () => this.rootStore.routerStore.goTo('master.app.main.register')
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
        try {
            await this.app.membershipModule.login.login({ username, password, options: ['sliding'] });
            const redirect = this.rootStore.authStore.getSignInRedirect();
            await this.rootStore.routerStore.goTo(redirect);
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
