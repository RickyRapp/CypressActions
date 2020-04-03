import _ from 'lodash';

class PermissionService {
    hasPermission(user, authorization) {
        var hasPermission = false;

        if (user) {
            if (user.permissions) {
                if (authorization) {
                    var tokens = _.split(authorization, '.');
                    if (tokens.length > 0) {
                        var section = _.toLower(tokens[0]);

                        var sectionPermissions = _.find(user.permissions, (value, key) => _.toLower(key) === section);
                        if (sectionPermissions) {
                            if (tokens.length > 1) {
                                var action = _.toLower(tokens[1]);
                                for (var i = 0; i < sectionPermissions.length; i++) {
                                    if (_.toLower(sectionPermissions[i]) === action) {
                                        hasPermission = true;
                                        break;
                                    }
                                }
                            } else {
                                hasPermission = true;
                            }
                        }
                    }
                } else {
                    hasPermission = true;
                }
            }
        }

        return hasPermission;
    }
}

export default PermissionService;