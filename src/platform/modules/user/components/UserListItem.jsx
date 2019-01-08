import React from 'react';
import { UserListItemTemplate } from 'themes/modules/user/components';

class UserListItem extends React.Component {
    render() {
        return <UserListItemTemplate {...this.props} />
    }
}

export default UserListItem;