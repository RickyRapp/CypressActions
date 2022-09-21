import { action } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { CharityResetPasswordForm } from '../forms';

class CharityResetPasswordViewStore extends BaseViewStore {
    recoverUrl = `${window.location.origin}/app/password-change/{?passwordRecoveryToken}`;
    form = new CharityResetPasswordForm({
        onSuccess: async (form) => {
            await this.requestReset({ ...form.values() });
        }
    });

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;
    }

    @action.bound onVerifyRecaptcha(response) {
        this.form.update({
            ...this.form.values(),
            recaptcha: response
        });
        this.form.validate();
    }

    @action.bound async requestReset({ userName, recaptcha }) {
        this.loaderStore.suspend();

        try {
            await this.rootStore.application.baasic.membershipModule.passwordRecovery.requestReset({
                userName: userName,
                challengeIdentifier: {},
                challengeResponse: recaptcha,
                recoverUrl: this.recoverUrl
            });
            this.loaderStore.resume();

            await this.goToLogin();
            this.rootStore.notificationStore.success('PASSWORD_RECOVERY.RESET_PASSWORD_EMAIL_SENT_MESSAGE');
        } catch (ex) {
            this.loaderStore.resume();
            if (ex.data && ex.data) {
                this.rootStore.notificationStore.error(ex.data.message ? ex.data.message : ex.data, ex);
            }
        }
    }

    @action.bound goToLogin() {
        return this.rootStore.routerStore.goTo('master.public.membership.login');
    }
}

export default CharityResetPasswordViewStore;