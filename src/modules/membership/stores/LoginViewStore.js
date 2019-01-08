import { action, runInAction } from 'mobx';
import { LoginForm } from 'modules/membership/forms';
import { BaseViewStore } from 'core/stores';

class LoginViewStore extends BaseViewStore {
    routes = {
        register: () => this.moduleStore.rootStore.routerStore.navigate('master.app.membership.register', { appId: this.rootStore.app.baasic.getApiKey() }),
        forgotPassword: () => this.moduleStore.rootStore.routerStore.navigate('master.app.membership.password-recovery', { appId: this.rootStore.app.baasic.getApiKey() }),
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
        super();
        
        this.rootStore = rootStore;
        this.moduleStore = rootStore.app.membership;
        this.store = this.moduleStore.loginStore;
    }

    @action.bound async login({ username, password }) {    
        this.loaderStore.suspend();    
        try {
            await this.store.login({ username, password });
            const redirectState = this.store.moduleStore.rootStore.authStore.getSignInRedirect();
            this.store.moduleStore.rootStore.routerStore.navigate(redirectState);
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