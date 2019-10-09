import { action } from 'mobx';
import { LoginForm } from 'application/membership/forms';
import { BaseViewStore } from 'core/stores';

class LoginViewStore extends BaseViewStore {
    routes = {
        forgotPassword: () => this.rootStore.routerStore.goTo('master.app.membership.password-recovery'),
        register: () => this.rootStore.routerStore.goTo('master.app.membership.register')
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
            await this.app.membershipModule.login.login({ username, password, options: ['sliding']});
            await this.rootStore.userStore.resolveUser();
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
                else if (data.error === 'invalid_grant_approve'){
                    this.loginForm.invalidate('User is not approved');
                }
            }
        }
    }

    @action.bound async logout() {
        if(!this.app.getAccessToken()){
            return;
        }
        const { token, type } = this.app.getAccessToken();

        try {
            const url = uritemplate.parse('login').expand({}); // eslint-disable-line
            await this.app.apiClient.delete(url, null, {
                token,
                type
            });
            this.app.updateAccessToken(null);
        } catch (ex) {
            // handle unsuccessful logout
        }
    }
}

export default LoginViewStore;
