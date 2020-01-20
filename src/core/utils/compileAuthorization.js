import _ from 'lodash';

export default function compileAuthorization(authorization) {
    let requestedAuth = _.isString(authorization)
        ? authorization
        : (_.isArray(authorization) && authorization.length === 1 ? authorization[0] : null);

    let auth = {};
    if (requestedAuth) {
        const tokens = _.split(requestedAuth, '.');
        if (tokens.length > 0) {
            const section = _.toLower(tokens[0]);
            auth.create = section + '.create';
            auth.edit = section + '.edit';
            auth.delete = section + '.delete';
        }
    }

    return auth;
}