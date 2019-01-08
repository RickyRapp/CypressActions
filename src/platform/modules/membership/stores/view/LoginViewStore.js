import { action, runInAction } from 'mobx';
import { LoginForm } from 'modules/membership/forms';
import { BaseViewStore } from 'core/stores';

class LoginViewStore extends BaseViewStore {
    routes = {
        forgotPassword: () => this.rootStore.routerStore.navigate('master.platform.membership.password-recovery')
    }

    loginForm = new LoginForm({
        onSuccess: async (form) => {
            const { email, password } = form.values();
            await this.login({
                username: email,
                password
            });
        },
        onError: (form) => {
            
        }
    });

    constructor(rootStore) {
        super(rootStore);

        this.moduleStore = rootStore.platform.membership;
        this.store = this.moduleStore.loginStore;
    }

    @action.bound async login({ username, password }) {    
        this.loaderStore.suspend();    
        try {
            await this.store.login({ username, password });
            this.rootStore.routerStore.navigate(this.rootStore.authStore.getSignInRedirect());
        } catch ({ statusCode, data }) {
            if (statusCode === 400) {
                if (data.error === 'invalid_grant') {                    
                    this.loginForm.invalidate('Invalid username or password');          
                }
            }            
        }
        this.loaderStore.resume();
    }
}

export default LoginViewStore;