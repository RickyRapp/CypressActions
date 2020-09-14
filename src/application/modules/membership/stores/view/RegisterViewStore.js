import { action, observable } from 'mobx';
import { RegisterForm } from 'application/membership/forms';
import { BaseViewStore } from 'core/stores';

const activationUrl = `${window.location.origin}/account-activation?activationToken={activationToken}`;

class RegisterViewStore extends BaseViewStore {
    @observable errorMessage = null;
    @observable loadingActivation = true;
    routes = {
        login: this.navigateToLoginPage,
        dashboard: this.navigateToDashboard
    };

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
        onError: () => {
        }
    });

    constructor(rootStore) {
        super();
        this.rootStore = rootStore;
        this.baasicApp = rootStore.application.baasic;
    }

    @action.bound navigateToLoginPage() {
        this.rootStore.routerStore.goTo('master.public.membership.login');
    }

    @action.bound navigateToDashboard() {
        this.rootStore.routerStore.goTo(this.rootStore.initialState);
    }

    @action.bound async register({ username, email, password, confirmPassword }) {
        this.loaderStore.suspend();
        try {
            await this.baasicApp.membershipModule.register.create({ username, email, password, confirmPassword, activationUrl });
            this.rootStore.routerStore.goTo('master.app.membership.registration-success');
        } catch ({ statusCode, data }) {

            //TODO implement translation if needed
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
            await this.baasicApp.membershipModule.register.activate(activationToken);
        }
        catch ({ statusCode }) {
            switch (statusCode) {
                case 400:
                    this.errorMessage = 'REGISTER.ACTIVATION.REQUEST_NOT_UNDERSTOOD_BY_SYSTEM';
                    break;
                case 401:
                    this.errorMessage = 'REGISTER.ACTIVATION.AUTHENTICATION_NEEDED';
                    break;
                case 403:
                    this.errorMessage = 'REGISTER.ACTIVATION.SYSTEM_REJECTION';
                    break;
                case 404:
                    this.errorMessage = 'REGISTER.ACTIVATION.NON_EXISTING_USER';
                    break;
                case 409:
                    this.errorMessage = 'REGISTER.ACTIVATION.SYSTEM_CONFLICT';
                    break;
                case 500:
                    this.errorMessage = 'REGISTER.ACTIVATION.GENERIC_ERROR';
            }
        }
        this.loadingActivation = false;
        this.loaderStore.resume();
    }
}

export default RegisterViewStore;