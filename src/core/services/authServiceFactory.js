import { RouterState } from 'mobx-state-router';
import { isSome } from 'core/utils';
import { PermissionService } from 'core/services';
import _ from 'lodash';

class AuthService {
    constructor(baasicApp) {
        this.baasicApp = baasicApp;
        this.permissionService = new PermissionService(baasicApp);
    }

    hasPermission(authorization = '') {
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
                authorized = this.permissionService.hasPermission(requestedAuthorization[i++]);
            }
        } else {
            authorized = this.permissionService.hasPermission();
        }

        return authorized;
    }
}

export default {
    create: (app) => new AuthService(app)
};