import { BaseViewStore } from 'core/stores';
import { PasswordChangeForm } from 'modules/membership/forms';
import { action } from 'mobx';

class PasswordChangeViewStore extends BaseViewStore {
  passwordChangeForm = new PasswordChangeForm({
    onSuccess: async form => {
      const { password } = form.values();
      const passwordRecoveryToken = this.rootStore.routerStore.routerState
        .queryParams.passwordRecoveryToken;

      await this.changePassword({
        password,
        passwordRecoveryToken
      });
    },
    onError: form => {}
  });

  constructor(rootStore) {
    super();

    this.rootStore = rootStore;
    this.moduleStore = rootStore.app.membership;
  }

  @action.bound async changePassword({ password, passwordRecoveryToken }) {
    this.loaderStore.suspend();

    try {
      await this.rootStore.app.baasic.membershipModule.passwordRecovery.reset({
        newPassword: password,
        passwordRecoveryToken
      });

      this.rootStore.notificationStore.success(
        'Your password has been changed'
      );
    } catch ({ statusCode, data }) {
      if (data) {
        this.rootStore.notificationStore.error(data);
      }
    }
    this.loaderStore.resume();

    await this.goToLogin();
  }

  @action.bound async goToLogin() {
    await this.rootStore.routerStore.navigate('master.app.membership.login', {
      appId: this.rootStore.routerStore.routerState.params.appId
    });
  }
}

export default PasswordChangeViewStore;
