import _ from 'lodash';
import { observe } from 'mobx';
import { PermissionService } from 'core/services';

class PermissionStore {
    rootStore = null;
    permissions = {};

    constructor(rootStore) {
        this.rootStore = rootStore;
        this.permissionService = new PermissionService();

        observe(this.rootStore.userStore, 'user', (
            // eslint-disable-next-line
            { oldValue, newValue }) => {
            this.resetPermissions();
        })
    }

    hasPermission = (authorization) => {
        let self = this;
        const permissionFunc = (policy) => {
            if (authorizationValid(policy) && _.has(self.permissions, policy)) {
                return _.get(self.permissions, policy);
            }

            const { user } = self.rootStore.userStore;
            const hasPermission = self.permissionService.hasPermission(user, policy);

            if (authorizationValid(policy)) {
                self.permissions[policy] = hasPermission;
            }

            return hasPermission;
        };

        let authorized = true;
        if (authorization) {
            if (_.isFunction(authorization)) {
                return authorization();
            }

            let requestedAuthorization;
            if (_.isArray(authorization)) {
                requestedAuthorization = authorization;
            } else if (_.isString(authorization)) {
                requestedAuthorization = [authorization];
            }

            let l = requestedAuthorization.length;
            let i = 0;
            while (authorized && i < l) {
                const accessPolicy = requestedAuthorization[i++];
                authorized = permissionFunc(accessPolicy);
                if (!authorized) {
                    const section = _.first(_.split(accessPolicy, '.'));
                    if (section && section !== '') {
                        authorized = permissionFunc(section + '.full');
                    }
                }
            }
        } else {
            authorized = permissionFunc(null);
        }

        return authorized;
    };

    resetPermissions() {
        this.permissions = {};
    }

    hasRolePermission = (authorization) => {
        let self = this;
        const permissionFunc = (role) => {
            const { user } = self.rootStore.userStore;
            return self.permissionService.hasRolePermission(user, role);
        };

        let authorized = false;
        if (authorization) {
            if (_.isFunction(authorization)) {
                return authorization();
            }

            let requestedAuthorization;
            if (_.isArray(authorization)) {
                requestedAuthorization = authorization;
            } else if (_.isString(authorization)) {
                requestedAuthorization = [authorization];
            }

            let l = requestedAuthorization.length;
            let i = 0;
            while (!authorized && i < l) {
                const role = requestedAuthorization[i++];
                authorized = permissionFunc(role);
            }
        } else {
            authorized = permissionFunc(null);
        }

        return authorized;
    };
}

function authorizationValid(authorization) {
    return !_.isNil(authorization) && authorization !== '';
}

export default PermissionStore;
