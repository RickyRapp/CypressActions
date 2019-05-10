import { action, runInAction } from 'mobx';
import { LoginForm } from 'modules/administration/membership/forms';
import { BaseViewStore } from 'core/stores';
import { resolveApplicationUser } from 'core/utils';

class LoginViewStore extends BaseViewStore {
  routes = {
    register: () =>
      this.moduleStore.rootStore.routerStore.navigate('master.app.administration.membership.register', { appId: this.rootStore.app.baasic.getApiKey() }),
    forgotPassword: () =>
      this.moduleStore.rootStore.routerStore.navigate('master.app.administration.membership.password-recovery', { appId: this.rootStore.app.baasic.getApiKey() })
  };

  loginForm = new LoginForm({
    onSuccess: async form => {
      const { email, password } = form.values();
      await this.login({
        username: email,
        password
      });
    },
    onError: form => { }
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
      //You can set here where it will redirect after successful login. Check roles and redirect where it needs to go.
      await resolveApplicationUser(this.rootStore.routerStore);
      if (this.rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.read')) { //administrator,employee
        this.rootStore.authStore.setSignInRedirect(this.rootStore.initialAdministrationState);
      }
      else if (this.rootStore.authStore.hasPermission('theDonorsFundCharitySection.read')) { //charity
        this.rootStore.authStore.setSignInRedirect(this.rootStore.initialCharityState);
      }
      else { //donor, reporter
        this.rootStore.authStore.setSignInRedirect(this.rootStore.initialMainState);
      }

      const redirectState = this.rootStore.authStore.getSignInRedirect();
      this.rootStore.routerStore.navigate(redirectState);
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
