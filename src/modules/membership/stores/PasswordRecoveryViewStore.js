import { action } from 'mobx';
import { PasswordRecoveryForm } from 'modules/membership/forms';
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
        this.moduleStore = rootStore.app.membership;
    }

    @action.bound onVerifyRecaptcha(response) {
        this.recaptchaResponse = response;
    }

    @action.bound async requestReset({ email }) {
        this.loaderStore.suspend();

        try {
            const recoverUrl = `${window.location.origin}/password-change/{?passwordRecoveryToken}`;
            const response = await this.rootStore.app.baasic.membershipModule.passwordRecovery.requestReset({
                userName: email,
                challengeIdentifier: {},
                challengeResponse: this.recaptchaResponse,            
                recoverUrl: recoverUrl
            });

            this.rootStore.notificationStore.success('An e-mail containing a link to reset the password on your account has been sent.');
            this.goToLogin();
        } catch(ex) {
            if (ex.data) {
                this.rootStore.notificationStore.error(ex.data);
            }
        }        

        this.loaderStore.resume();
    }

    @action.bound goToLogin() {
        this.rootStore.routerStore.navigate('master.app.membership.login', { appId: this.rootStore.app.baasic.getApiKey() });
    }
}

export default PasswordRecoveryViewStore;