import { RouterState } from 'mobx-state-router';
import { isSome } from 'core/utils';
import { PermissionService } from 'core/services';
import _isArray from 'lodash/isArray';

const getImpersonatedStorageKey = (app) => 'baasic-impersonated-user-' + app.getApiKey();

class AuthService {
    constructor(baasicApp) {
        this.baasicApp = baasicApp;
        this.permissionService = new PermissionService(baasicApp);
    }

    setImpersonatedUser(user) {
        const {
            settings: {
                storageHandler: { set, remove }
            }
        } = this.baasicApp;

        const storageKey = getImpersonatedStorageKey(this.baasicApp);
        if (isSome(user)) {
            set(storageKey, JSON.stringify(user));
        } else {
            remove(storageKey);
        }
    }

    getImpersonatedUser() {
        const storageKey = getImpersonatedStorageKey(this.baasicApp);
        return JSON.parse(this.baasicApp.settings.storageHandler.get(storageKey));
    }

    async loadImpersonatedUser() {

    }

    hasPermission(authorization = '') {
        var authorized = true;
        if (authorization) {
            if (typeof authorization === 'function') {
                return authorization();
            }

            var requestedAuthorization;
            if (_isArray(authorization)) {
                requestedAuthorization = authorization;
            } else if (typeof authorization === 'string') {
                requestedAuthorization = [authorization];
            }

            var l = requestedAuthorization.length;
            var i = 0;
            while (authorized && i < l) {
                authorized = this.permissionService.hasPermission(requestedAuthorization[i++]);
            }
        } else {
            authorized = this.permissionService.hasPermission();
        }

        return authorized;
    }
}

export default AuthService;