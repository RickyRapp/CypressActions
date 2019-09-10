import { observable, action, computed, reaction, has } from 'mobx';
import { isSome } from 'core/utils';
import { menuProvider } from 'core/providers';
import { RouterState } from 'mobx-state-router';
import { PermissionService } from 'core/services';
import _ from 'lodash';

class AuthStore {
  rootStore;

  @observable token = undefined;
  @observable user = null;
  @observable impersonatedUser = null;
  // Where should we redirect after sign in
  @observable signInRedirect = null;

  @computed get isAuthenticated() {
    return isTokenValid(this.token);
  }

  constructor(rootStore) {
    this.rootStore = rootStore;

    // sync local token with baasic app token
    reaction(
      () => this.token,
      token => {
        if (!this.isAuthenticated) {
          this.resetPermissions();
          this.setUser(null);

          const currentRoute = this.rootStore.routerStore.routerState;
          if (currentRoute.isPrivate) {
            this.rootStore.routerStore.navigate(this.rootStore.getLoginRoute());
          }
        }
      },
      { equals: (from, to) => from === to }
    );

    reaction(() => this.user, user => { });

    this.initAuthEvents();
  }

  getSignInRedirect() {
    if (this.signInRedirect) {
      return this.signInRedirect;
    }

    return this.rootStore.initialState;
  }

  getRoleInitialRedirect() {
    if (this.isAuthenticated) {
      if (this.isAdministratorRole) { //administrator
        return this.rootStore.initialAdministrationState;
      }
      else if (this.isEmployeeRole) { //employee
        return this.rootStore.initialAdministrationState;
      }
      else if (this.isUserRole) { //donor
        return this.rootStore.initialMainDonorAccountState;
      }
      else if (this.isCharityRole) { //charity
        return this.rootStore.initialMainCharityState;
      }
      else if (this.isScannerRole) { //scanner
        return this.rootStore.initialScannerState;
      }
      return this.rootStore.initialState;
    }

    return this.rootStore.initialState;
  }

  @action updateAccessToken(token) {
    this.token = isTokenValid(token) ? token : null;
  }

  @action setUser = user => {
    const app = this.rootStore.getBaasicApp();
    if (user) {
      app.setUser(user);
      this.user = user;
    } else {
      this.resetPermissions();
      app.setUser(null);
      this.user = null;
    }
  };

  getImpersonatedUser() {
    return JSON.parse(localStorage.getItem(storageKey));
  }

  @action setImpersonatedUser(user) {
    if (user === undefined || user === null) {
      localStorage.removeItem(storageKey);
    } else {
      localStorage.setItem(storageKey, JSON.stringify(user));
    }

    this.impersonatedUser = user;
  }

  @action updateUser(user) {
    const currentUser = this.user ? { ...this.user, ...user } : user;
    this.setUser(currentUser);
  }

  @action setSignInRedirect(state) {
    this.signInRedirect = state;
  }

  resetSignInRedirect() {
    this.setSignInRedirect(null);
  }

  async initialize() {
    const baasic = this.rootStore.getBaasicApp();

    var token = null;
    if (baasic) {
      token = baasic.getAccessToken();
    }

    this.updateAccessToken(token);

    return Promise.resolve();
  }

  resetPermissions() {
    this.rootStore.getBaasicApp().membershipModule.permissions.resetPermissions();
  }

  @action.bound hasPermission(authorization = '') {
    const permissionService = new PermissionService(
      this.rootStore.getBaasicApp()
    );
    var authorized = true;
    if (authorization) {
      if (typeof authorization === 'function') {
        return authorization();
      }

      var requestedAuthorization;
      if (_.isArray(authorization)) {
        requestedAuthorization = authorization;
      } else if (typeof authorization === 'string') {
        requestedAuthorization = [authorization];
      }

      var l = requestedAuthorization.length;
      var i = 0;
      while (authorized && i < l) {
        authorized = permissionService.hasPermission(
          requestedAuthorization[i++]
        );
      }
    } else {
      authorized = permissionService.hasPermission();
    }

    return authorized;
  }

  initAuthEvents() {
    document.addEventListener('tokenExpired', e => {
      this.updateAccessToken(null);
    });

    document.addEventListener('tokenUpdated', async e => {
      const token = e.app.getAccessToken();
      this.updateAccessToken(token);
    });
  }

  @computed get isAdministratorRole() {
    return _.includes(this.user.roles, 'Administrators');
  }

  @computed get isEmployeeRole() {
    return _.includes(this.user.roles, 'Employees');
  }

  @computed get isUserRole() {
    return _.includes(this.user.roles, 'Users');
  }

  @computed get isScannerRole() {
    return _.includes(this.user.roles, 'Scanners');
  }

  @computed get isReporterRole() {
    //TODO:
    return _.includes(this.user.roles, 'Reporters');
  }


}

function isTokenValid(token) {
  return (
    isSome(token) &&
    (token.expireTime === undefined ||
      token.expireTime === null ||
      token.expireTime - new Date().getTime() > 0)
  );
}

export default AuthStore;
