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
    if (!isSome(user) || !isSome(user.user)) {
      return false;
    }
  }

  appUserHasPermission(authorization) {
    if (authorization) {
      return checkPermission(
        this.baasicApp.membershipModule.permissions,
        authorization
      );
    }

    const { user } = this.baasicApp.getUser();
    if (user.apiKey) {
      return (
        user.apiKey.toLowerCase() === this.baasicApp.getApiKey().toLowerCase()
      );
    }

    return false;
  }
}

function firstCharToLowerCase(text) {
  return text.replace(/^./, function(char) {
    return char.toLowerCase();
  });
}

function checkPermission(permissionService, authorization) {
  authorization = firstCharToLowerCase(authorization);
  var fullPermission = authorization.split('.')[0] + '.full';
  return (
    permissionService.hasPermission(authorization) ||
    permissionService.hasPermission(fullPermission)
  );
}

export default PermissionService;
