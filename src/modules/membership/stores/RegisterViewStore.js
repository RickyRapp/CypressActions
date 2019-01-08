import { action, observable } from 'mobx';
import { RegisterForm } from 'modules/membership/forms';
import { ActivationConfirmTemplate } from 'themes/modules/membership/pages';
import { BaseViewStore } from 'core/stores';

class RegisterViewStore extends BaseViewStore {
    @observable errorMessage = null;
    @observable loadingActivation = true;

    registerForm = new RegisterForm({
        onSuccess: async (form) => {
            const { username, email, password, confirmPassword } = form.values();
            await this.register({
                username,
                email,
                password,
                confirmPassword
            });
        },
        onError: (form) => {
        }
    });

    constructor(rootStore) {
        super();
        
        this.rootStore = rootStore;
        this.moduleStore = rootStore.app.membership;
        this.store = this.moduleStore.registerStore;
    }

    @action.bound async register({ username, email, password, confirmPassword }) {
        this.loaderStore.suspend();
        try {
            await this.store.register({ username, email, password, confirmPassword });
            this.rootStore.routerStore.navigate('master.app.membership.registration-success');
        } catch ({ statusCode, data }) {
            switch (statusCode) {
                case 400:
                    this.registerForm.invalidate('Requested action could not be understood by the system.');
                    break;
                case 401:
                    this.registerForm.invalidate('Requested action requires authentication.');
                    break;
                case 403:
                    this.registerForm.invalidate('System refuses to fulfill the requested action.');
                    break;
                case 409:
                    this.registerForm.invalidate('Requested action could not be carried out because of a conflict in the system.');
                    break;
                case 500:
                    this.registerForm.invalidate('A generic error has occurred on the system.');
            }
        }
        this.loaderStore.resume();
    }

    @action.bound async handleActivation() {
        this.activate(this.rootStore.routerStore.routerState.queryParams.activationToken);
    }

    @action.bound async activate(activationToken) {
        this.loaderStore.suspend();
        try {
            await this.store.activate(activationToken);
        }
        catch ({ statusCode }) {
            switch (statusCode) {
                case 400:
                    this.errorMessage = "Requested action could not be understood by the system.";
                    break;
                case 401:
                    this.errorMessage = "Requested action requires authentication.";
                    break;
                case 403:
                    this.errorMessage = "System refuses to fulfill the requested action.";
                    break;
                case 404:
                    this.errorMessage = "Specified user account does not exist in the system.";
                    break;
                case 409:
                    this.errorMessage = "Requested action could not be carried out because of a conflict in the system.";
                    break;
                case 500:
                    this.errorMessage = "A generic error has occurred on the system.";
            }
        }
        this.loadingActivation = false;
        this.loaderStore.resume();
    }

}

export default RegisterViewStore;