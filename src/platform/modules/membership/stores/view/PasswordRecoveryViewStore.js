import { action } from 'mobx';
import { PasswordRecoveryForm } from 'platform/modules/membership/forms';
import { BaseViewStore } from 'core/stores';

class PasswordRecoveryViewStore extends BaseViewStore {
    recaptchaResponse = null;
    form = new PasswordRecoveryForm({
        onSuccess: async (form) => {
            await this.requestReset({ ...form.values() });
        }
    });

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;
        this.moduleStore = rootStore.platform.membership;;
        this.mainView = this.moduleStore.viewStore;
    }

    @action.bound onVerifyRecaptcha(response) {
        this.recaptchaResponse = response;
    }

    @action.bound async requestReset({ email }) {
        this.loaderStore.suspend();

        const { rootStore } = this.moduleStore;

        try {
            await rootStore.platform.membership.passwordRecoveryStore.requestReset({
                userName: email,
                challengeIdentifier: {},
                challengeResponse: this.recaptchaResponse
            });
            rootStore.notificationStore.success('An e-mail containing a link to reset the password on your account has been sent.');
            this.goToLogin();
        } catch(ex) {
            if (ex.data) {
                rootStore.notificationStore.error(ex.data);
            }
        }        

        this.loaderStore.resume();
    }

    @action.bound goToLogin() {
        this.rootStore.routerStore.navigate('master.platform.membership.login');
    }
}

export default PasswordRecoveryViewStore;