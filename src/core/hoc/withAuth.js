import React from 'react';
import { inject } from 'mobx-react';
import { PropTypes } from 'prop-types';

function withAuth(Component) {
    @inject(i => ({
        permissionStore: i.rootStore.permissionStore
    }))
    class AuthComponent extends React.Component {
        render() {
            const { permissionStore, authorization, ...otherProps } = this.props;
            if (authorization) {
                if (permissionStore.hasPermission(authorization)) {
                    return <Component {...otherProps} />
                }
                else {
                    return null;
                }
            }
            else {
                return <Component {...otherProps} />;
            }
        }
    }

    AuthComponent.propTypes = {
        permissionStore: PropTypes.object,
        authorization: PropTypes.any
    };

    return AuthComponent;
}

export default withAuth;