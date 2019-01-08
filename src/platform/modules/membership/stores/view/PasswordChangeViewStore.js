import { BaseViewStore } from 'core/stores';
import { PasswordChangeForm } from 'platform/modules/membership/forms';
import { action } from 'mobx';

class PasswordChangeViewStore extends BaseViewStore {
    passwordChangeForm = new PasswordChangeForm({
        onSuccess: async (form) => {
            const { password } = form.values();
            const passwordRecoveryToken = this.moduleStore.rootStore.routerStore.routerState.queryParams.passwordRecoveryToken;

            await this.changePassword({
                password,
                passwordRecoveryToken
            });
        },
        onError: (form) => {
        }
    });

    constructor(rootStore) {
        super();

        this.rootStore = rootStore;
        this.moduleStore = rootStore.platform.membership;
    }

    @action.bound async changePassword({ password, passwordRecoveryToken }) {
        this.loaderStore.suspend();

        try {
            await this.rootStore.platform.membership.passwordRecoveryStore.reset({
                newPassword: password,
                passwordRecoveryToken
            });

            this.rootStore.notificationStore.success('Your password has been changed.');
            this.goToLogin();
        } catch ({ statusCode, data }) {
            if (data) {
                this.rootStore.notificationStore.error(data);
                this.goToLogin();
            }
        }
        this.loaderStore.resume();
    }

    @action.bound goToLogin() {
        this.rootStore.routerStore.navigate('master.platform.membership.login');
    }
}

export default PasswordChangeViewStore;