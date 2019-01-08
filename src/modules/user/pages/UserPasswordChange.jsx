import React from 'react';
import { UserPasswordChangeTemplate } from 'themes/modules/user/pages';
import { inject, observer } from 'mobx-react';

@observer
class UserPasswordChange extends React.Component {
    render() {
        return <UserPasswordChangeTemplate {...this.props} />
    }
}

export default UserPasswordChange;