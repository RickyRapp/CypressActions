import { BaseViewStore } from 'core/stores';
import { PasswordChangeForm } from 'application/membership/forms';
import { action } from 'mobx';

class PasswordChangeViewStore extends BaseViewStore {
    passwordChangeForm = new PasswordChangeForm({
        onSuccess: async form => {
            const { password } = form.values();
            await this.changePassword({
                password,
                passwordRecoveryToken: this.passwordRecoveryToken
            });
        }
    });

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;
        this.passwordRecoveryToken = this.rootStore.routerStore.routerState.queryParams.passwordRecoveryToken;

        if (!this.passwordRecoveryToken) {
            this.goToLogin().then(() =>
                this.rootStore.notificationStore.warning(
                    'PASSWORD_CHANGE.ERROR_MESSAGE.URL_NOT_VALID'
                )
            );
        }
    }

    @action.bound async changePassword({ password, passwordRecoveryToken }) {
        this.loaderStore.suspend();
        try {
            await this.rootStore.application.baasic.membershipModule.passwordRecovery.reset(
                {
                    newPassword: password,
                    passwordRecoveryToken
                }
            );

            this.loaderStore.resume();

            this.goToLogin().then(() =>
                this.rootStore.notificationStore.success(
                    'PASSWORD_CHANGE.SUCCESS_MESSAGE'
                )
            );
        } catch ({ statusCode, data }) {
            this.loaderStore.resume();

            switch (statusCode) {
                case 500:
                    this.rootStore.notificationStore.error('PASSWORD_CHANGE.ERROR_MESSAGE.TOKEN_EXPIRED', data);
                    this.goToLogin();
                    break;

                default:
                    this.rootStore.notificationStore.error('PASSWORD_CHANGE.ERROR_MESSAGE.UNKNOWN_EXPIRED_TOKEN', data);
                    break;
            }
        }
    }

    @action.bound goToLogin() {
        return this.rootStore.routerStore.goTo(
            'master.public.membership.login'
        );
    }
}

export default PasswordChangeViewStore;