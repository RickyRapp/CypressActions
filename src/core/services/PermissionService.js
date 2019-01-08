import { isSome } from 'core/utils';
import _ from 'lodash';

class PermissionService {
    constructor(baasicApp) {
        this.baasicApp = baasicApp;
    }

    hasPermission(authorization) {
        // TODO: implement authorization when user is correctly fetched
        return true;

        const user = this.baasicApp.getUser();
        if (!isSome(user) || !isSome(user.user)) { return false; }
    
        return user.user.isApplicationUser === false
            ? this.platformUserHasPermission(authorization) : this.appUserHasPermission(authorization);
    }
    
    appUserHasPermission(authorization) {
        if (authorization) {
            return checkPermission(this.baasicApp.membershipModule.permissions, authorization);
        }

        const { user } = this.baasicApp.getUser();
        if (user.apiKey) {
            return user.apiKey.toLowerCase() === this.baasicApp.getApiKey().toLowerCase();
        }

        return false;
    }
    
    platformUserHasPermission(authorization) {
        const { user } = this.baasicApp.getUser();
        const apiKey = this.baasicApp.getApiKey();
        if (authorization) {
            return checkPermission(this.baasicApp.membershipModule.permissions, authorization);
        } 

        if (apiKey === 'platform') {
            return true;
        }

        return user.applications !== undefined && _.some(user.applications, function (app) { return app && app.identifier && app.identifier.toLowerCase() === apiKey; });
    }
}

function firstCharToLowerCase(text) {
    return text.replace(/^./, function (char) {
        return char.toLowerCase();
    });
}

function checkPermission(permissionService, authorization) {
    authorization = firstCharToLowerCase(authorization);
    var fullPermission = authorization.split(".")[0] + ".full";
    return permissionService.hasPermission(authorization) || permissionService.hasPermission(fullPermission);
}

export default PermissionService;